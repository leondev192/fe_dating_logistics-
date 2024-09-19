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
  ActivityIndicator,
} from 'react-native';
import {getMessages, sendMessage} from '../../apis/services/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../../apis/services/userService';
import {Send, Add} from 'iconsax-react-native'; // Sử dụng icon tài liệu để xem hồ sơ
import {launchImageLibrary} from 'react-native-image-picker'; // Sử dụng để chọn ảnh
import {useNavigation} from '@react-navigation/native'; // Để điều hướng đến trang xem hồ sơ
import axios from 'axios';
import {
  CLOUDINARY_API_URL,
  CLOUDINARY_UPLOAD_PRESET,
} from '../../apis/cloudinary.config'; // Thêm config Cloudinary

const ChatDetail = ({route}) => {
  const {conversationId} = route.params;
  const navigation = useNavigation();

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false); // Trạng thái upload ảnh
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchMessages();
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
      // console.error('Cannot fetch user information:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const messagesData = await getMessages(conversationId);
      setMessages(messagesData);
      scrollToBottom();
    } catch (error) {
      // console.warn('Failed to fetch messages.');
    }
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage(conversationId, {message: newMessage});
        setNewMessage('');
        fetchMessages();
      } catch (error) {
        // console.warn('Failed to send message.');
      }
    }
  };

  const handleImageUpload = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.errorCode) {
        // console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        await uploadPhotoToCloudinary(asset);
      }
    });
  };

  const uploadPhotoToCloudinary = async selectedImage => {
    setUploading(true);

    const data = new FormData();
    data.append('file', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName || `photo.jpg`,
    });
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_API_URL, data);
      const imageUrl = response.data.secure_url;

      // Gửi ảnh qua tin nhắn
      await sendMessage(conversationId, {message: imageUrl});
      fetchMessages(); // Tải lại tin nhắn sau khi gửi ảnh
    } catch (error) {
      // console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const renderMessageItem = ({item}: {item: any}) => {
    const isCurrentUser = item.sender?.id === currentUser?.id;

    // Kiểm tra nếu nội dung tin nhắn là URL ảnh
    const isImageMessage = item.content?.startsWith('http');

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
                item.sender?.profilePictureUrl ||
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
            {isImageMessage ? (
              <Image source={{uri: item.content}} style={styles.imageMessage} />
            ) : (
              <Text style={styles.messageText}>{item.content}</Text>
            )}
          </View>
          <Text style={styles.timestamp}>{formatTime(item.createdAt)}</Text>
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
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onContentSizeChange={scrollToBottom}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={handleImageUpload}
          style={styles.uploadButton}>
          {uploading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Add size={30} color="#110088" />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Send size={30} color="#110088" variant="Bold" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#FFFFFF',
  },
  theirBubble: {
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    marginBottom: 15,
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
  uploadButton: {
    padding: 5,
    marginRight: 10,
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default ChatDetail;
