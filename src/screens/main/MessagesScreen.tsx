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

// Định nghĩa các kiểu dữ liệu
interface UserType {
  id: string;
  companyName?: string;
  profilePictureUrl?: string;
}

interface MessageType {
  content: string;
  createdAt: string;
  isRead: boolean;
  senderId: string;
}

interface ConversationType {
  id: string;
  sender: UserType;
  receiver: UserType;
  messages: MessageType[];
}

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const conversationsData = await getUserConversations();
      if (!currentUser) return;

      // Sắp xếp các cuộc trò chuyện: đưa những cuộc có tin nhắn chưa đọc lên đầu
      const sortedConversations = conversationsData.sort(
        (a: ConversationType, b: ConversationType) => {
          const aUnread =
            a.messages[0]?.isRead === false &&
            a.messages[0]?.senderId !== currentUser.id;
          const bUnread =
            b.messages[0]?.isRead === false &&
            b.messages[0]?.senderId !== currentUser.id;

          if (aUnread && !bUnread) return -1; // Cuộc trò chuyện `a` có tin nhắn chưa đọc
          if (!aUnread && bUnread) return 1; // Cuộc trò chuyện `b` có tin nhắn chưa đọc
          return (
            new Date(b.messages[0]?.createdAt).getTime() -
            new Date(a.messages[0]?.createdAt).getTime()
          ); // Sắp xếp theo thời gian tin nhắn mới nhất
        },
      );

      setConversations(sortedConversations);
    } catch (error) {
      console.warn('Không thể lấy danh sách cuộc hội thoại.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = (conversationId: string) => {
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
  }, [currentUser]);

  const renderConversationItem = ({item}: {item: ConversationType}) => {
    if (!currentUser) return null;

    const user =
      item.sender.id !== currentUser.id ? item.sender : item.receiver;

    return (
      <TouchableOpacity
        style={[
          styles.conversationItem,
          {
            backgroundColor:
              item.messages[0]?.isRead === false &&
              item.messages[0]?.senderId !== currentUser.id
                ? '#E8F0FE' // Màu nền khi có tin nhắn chưa đọc
                : '#FFFFFF',
          },
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
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    borderRadius: 10,
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
    maxWidth: '90%',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#888',
  },
});

export default MessagesScreen;
