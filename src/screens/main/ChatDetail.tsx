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
} from 'react-native';
import {getMessages, sendMessage} from '../../apis/services/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../../apis/services/userService';
import {Send} from 'iconsax-react-native';

const ChatDetail = ({route}) => {
  const {conversationId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Polling every 5 seconds to check for new messages

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
      scrollToBottom(); // Tự động cuộn xuống dưới khi tải tin nhắn mới
    } catch (error) {
      console.warn('Không thể lấy tin nhắn.');
    }
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage(conversationId, {message: newMessage});
        setNewMessage('');
        fetchMessages(); // Refresh messages after sending
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

  const renderMessageItem = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.senderId === currentUser?.id
          ? styles.myMessageContainer
          : styles.theirMessageContainer,
      ]}>
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onContentSizeChange={scrollToBottom} // Scroll to bottom when new messages arrive
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Send size={24} color="#007AFF" variant="Bold" />
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
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  myMessageContainer: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  theirMessageContainer: {
    backgroundColor: '#E1E1E1',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#F9F9F9',
  },
  sendButton: {
    padding: 10,
  },
});

export default ChatDetail;
