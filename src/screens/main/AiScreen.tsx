import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image, // Import Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import {generateTextWithCohere} from '../../apis/services/OpenAIApi';
import Colors from '../../constants/colors';

const ChatScreen: React.FC = () => {
  const [message, setMessage] = useState(''); // Quản lý trạng thái của tin nhắn
  const [chatHistory, setChatHistory] = useState<{user: string; ai: string}[]>(
    [],
  ); // Lưu trữ lịch sử chat

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = message;
      setMessage(''); // Xóa nội dung TextInput sau khi gửi
      setChatHistory([
        ...chatHistory,
        {user: userMessage, ai: 'Đang soạn tin nhắn...'}, // Thêm tin nhắn người dùng và thông báo AI đang soạn
      ]);

      try {
        const aiResponse = await generateTextWithCohere(userMessage); // Gọi API Cohere
        setChatHistory(prevHistory =>
          prevHistory.map((item, index) =>
            index === prevHistory.length - 1
              ? {user: item.user, ai: aiResponse} // Cập nhật tin nhắn AI sau khi có phản hồi
              : item,
          ),
        );
      } catch (error) {
        setChatHistory([
          ...chatHistory,
          {user: userMessage, ai: 'Có lỗi xảy ra, vui lòng thử lại.'}, // Xử lý lỗi nếu không nhận được phản hồi từ AI
        ]);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Điều chỉnh offset cho iOS
    >
      <ScrollView style={styles.chatHistory}>
        {chatHistory.map((chat, index) => (
          <View key={index}>
            {chat.user && (
              <View style={styles.messageContainerRight}>
                <View style={styles.userBubble}>
                  <Text style={styles.userMessage}>Bạn: {chat.user}</Text>
                </View>
              </View>
            )}

            {chat.ai && (
              <View style={styles.messageContainerLeft}>
                <View style={styles.aiAvatarContainer}>
                  <Image
                    source={require('../../assets/images/log.png')} // Đường dẫn tới ảnh logo trong assets
                    style={styles.aiAvatar}
                  />
                </View>
                <View>
                  <LinearGradient
                    colors={['#FF358A', '#110088']} // Màu gradient cho AI bubble
                    style={styles.aiBubble}>
                    <Text style={styles.aiMessage}>
                      Dating logistics: {chat.ai}
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Hãy đặt câu hỏi..."
          value={message}
          onChangeText={setMessage} // Cập nhật nội dung tin nhắn
          placeholderTextColor="#AAA"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Nền màu xám nhạt
  },
  chatHistory: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 5, // Thêm khoảng cách hai bên
    marginTop: 5,
  },
  messageContainerLeft: {
    flexDirection: 'row', // Để ảnh và tin nhắn nằm trên cùng một dòng
    alignItems: 'flex-start', // Căn tin nhắn với ảnh đại diện
    marginBottom: 15, // Tạo khoảng cách giữa các tin nhắn
    marginTop: 5,
  },
  messageContainerRight: {
    flexDirection: 'row', // Để ảnh và tin nhắn nằm trên cùng một dòng
    justifyContent: 'flex-end',
    marginBottom: 15, // Tạo khoảng cách giữa các tin nhắn
    marginTop: 5,
  },
  aiAvatarContainer: {
    marginRight: 5, // Tạo khoảng cách giữa avatar và tin nhắn
  },
  aiAvatar: {
    width: 30, // Kích thước ảnh đại diện
    height: 30,
    borderRadius: 20, // Bo tròn ảnh đại diện
  },

  aiBubble: {
    borderRadius: 20,
    padding: 15,
    maxWidth: '89%',
  },

  userBubble: {
    backgroundColor: '#FFFFFF', // Màu nền tin nhắn người dùng
    borderRadius: 20,
    padding: 15,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userMessage: {
    color: '#333', // Màu chữ của tin nhắn người dùng
  },
  aiMessage: {
    color: '#FFF', // Màu chữ của AI sẽ là màu trắng để tương phản với nền gradient
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 10,
    marginHorizontal: 5, // Thêm khoảng cách bên trái và phải cho input
  },
  input: {
    flex: 1,
    fontSize: 14, // Kích thước chữ lớn hơn
    padding: 10,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14, // Kích thước chữ lớn hơn
  },
});

export default ChatScreen;
