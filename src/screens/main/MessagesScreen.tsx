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
import LoadingSpinner from '../../components/loading/LoadingSpinner'; // Import LoadingSpinner
import {useNavigation} from '@react-navigation/native';

const MessagesScreen = ({}) => {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading

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
      console.error('Không thể lấy thông tin người dùng:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      setLoading(true); // Bắt đầu loading
      const conversationsData = await getUserConversations();
      setConversations(conversationsData);
    } catch (error) {
      console.warn('Không thể lấy danh sách cuộc hội thoại.', error);
    } finally {
      setLoading(false); // Kết thúc loading
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
    fetchConversations();
  }, []);

  const renderConversationItem = ({item}) => {
    if (!currentUser) return null;

    const user =
      item.sender.id !== currentUser.id ? item.sender : item.receiver;

    return (
      <TouchableOpacity
        style={styles.conversationItem}
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
            {item.messages && item.messages.length > 0
              ? item.messages[0].content
              : 'Chưa có tin nhắn nào'}
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
    backgroundColor: '#f5f5f5',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    marginHorizontal: 10,
    marginTop: 10,
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
    fontSize: 16,
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
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
