// MessagesScreen.tsx
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  getUserConversations,
  deleteConversation,
} from '../../apis/services/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../../apis/services/userService';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import {useNavigation} from '@react-navigation/native';
import {useAnimatedValue} from '../../hooks/useAnimatedValue';

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const animatedValue = useAnimatedValue(0);

  useEffect(() => {
    fetchCurrentUser();
    fetchConversations();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const userInfo = await getUserInfo(token);
        setCurrentUser(userInfo);
      }
    } catch (error) {
      // console.error('Không thể lấy thông tin người dùng:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const conversationsData = await getUserConversations();
      setConversations(conversationsData);
    } catch (error) {
      console.warn('Không thể lấy danh sách cuộc hội thoại:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = conversationId => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa cuộc trò chuyện này?',
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              await deleteConversation(conversationId);
              fetchConversations();
              Alert.alert('Thành công', 'Cuộc trò chuyện đã được xóa.');
            } catch (error) {
              Alert.alert('Lỗi', 'Không thể xóa cuộc trò chuyện.');
            }
          },
        },
      ],
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchConversations().finally(() => setRefreshing(false));
  }, []);

  const renderConversationItem = ({item}) => {
    if (!currentUser) return null;

    // Xác định đối tác trong cuộc trò chuyện
    const user =
      item.sender.id !== currentUser.id ? item.sender : item.receiver;
    const latestMessage = item.messages[0]; // Tin nhắn mới nhất
    const isUnread =
      latestMessage &&
      !latestMessage.isRead &&
      latestMessage.senderId !== currentUser.id; // Kiểm tra tin nhắn chưa đọc

    return (
      <TouchableOpacity
        style={[
          styles.conversationItem,
          {backgroundColor: isUnread ? '#E8F0FE' : '#FFFFFF'}, // Thay đổi màu nền nếu tin nhắn chưa đọc
        ]}
        onPress={() =>
          navigation.navigate('ChatDetail', {conversationId: item.id})
        }
        onLongPress={() => handleDeleteConversation(item.id)}>
        <Image
          source={{
            uri: user.profilePictureUrl || 'https://via.placeholder.com/50',
          }}
          style={styles.avatar}
        />
        <View style={styles.conversationInfo}>
          <Text style={styles.conversationTitle}>
            {user.companyName || 'Tên công ty không xác định'}
          </Text>
          <Text
            style={styles.lastMessage}
            numberOfLines={1}
            ellipsizeMode="tail">
            {latestMessage
              ? latestMessage.content
              : 'Đã ghép đôi, hãy trò chuyện cùng đối tác'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không có cuộc trò chuyện nào</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    marginHorizontal: 10,
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationTitle: {
    fontSize: 14,
    color: '#333',
  },
  lastMessage: {
    fontSize: 12,
    color: '#666',
    maxWidth: '90%', // Đảm bảo văn bản không vượt quá chiều rộng của container
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default MessagesScreen;
