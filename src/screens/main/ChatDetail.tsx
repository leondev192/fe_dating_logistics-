import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import {getMessages, sendMessage} from '../../apis/services/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../../apis/services/userService';
import {Send} from 'iconsax-react-native';
import Color from '../../constants/colors';

const ChatDetail = ({route}) => {
  const {conversationId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchMessages(); // Gọi để cập nhật tin nhắn và trạng thái đã đọc
    const interval = setInterval(fetchMessages, 5000); // Polling every 5 seconds

    return () => clearInterval(interval);
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

  const fetchMessages = async () => {
    try {
      const messagesData = await getMessages(conversationId);
      setMessages(messagesData);
      scrollToBottom();
    } catch (error) {
      console.warn('Không thể lấy tin nhắn.');
    }
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage(conversationId, {message: newMessage});
        setNewMessage('');
        fetchMessages();
      } catch (error) {
        console.warn('Không thể gửi tin nhắn.');
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setRefreshing(false);
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const formatTime = dateString => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const renderMessageItem = ({item}) => {
    const isCurrentUser = item.sender.id === currentUser?.id;

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser
            ? styles.myMessageContainer
            : styles.theirMessageContainer,
        ]}>
        {!isCurrentUser && (
          <Image
            source={{
              uri:
                item.sender.profilePictureUrl ||
                'https://via.placeholder.com/40',
            }}
            style={styles.avatar}
          />
        )}
        <View>
          <View
            style={[
              styles.bubbleContainer,
              isCurrentUser ? styles.myBubble : styles.theirBubble,
            ]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.timestamp}>{formatTime(item.createdAt)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ios: 90, android: 80})}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onContentSizeChange={scrollToBottom}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#888"
          onFocus={() => scrollToBottom()} // Cuộn xuống khi người dùng nhập tin nhắn
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Send size={30} color="#007AFF" variant="Bold" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  messageContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    marginRight: 10,
    flexDirection: 'row-reverse',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  bubbleContainer: {
    borderRadius: 20,
    padding: 10,
  },
  myBubble: {
    backgroundColor: '#0884fc',
  },
  theirBubble: {
    backgroundColor: '#B1B1B1',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    marginBottom: 30,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#FFF',
    alignItems: 'center',
    height: 60,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#F9F9F9',
  },
  sendButton: {
    padding: 5,
  },
});

export default ChatDetail;
