import apiClient from '../apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Lấy danh sách các cuộc hội thoại của người dùng
export const getUserConversations = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại.');
    }

    const response = await apiClient.get('/chats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // Ẩn thông báo lỗi bằng cách không log ra console và trả về giá trị mặc định
    return [];
  }
};

// Lấy tin nhắn từ một cuộc hội thoại cụ thể
// Lấy tin nhắn từ một cuộc hội thoại cụ thể
export const getMessages = async conversationId => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại.');
    }

    const response = await apiClient.get(`/chats/${conversationId}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Đảm bảo API trả về dữ liệu sender cho mỗi message
  } catch (error) {
    return [];
  }
};

// Gửi tin nhắn trong cuộc hội thoại
export const sendMessage = async (
  conversationId: string,
  {message}: {message: string},
) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại.');
    }

    const response = await apiClient.post(
      `/chats/${conversationId}/send-message`,
      {message},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    // Ẩn thông báo lỗi bằng cách không log ra console và xử lý im lặng
    throw error; // Hoặc có thể return null hoặc giá trị khác nếu muốn xử lý khác
  }
};

interface CreateChatParams {
  postId: string;
  receiverId: string;
}

export const createChat = async ({postId, receiverId}: CreateChatParams) => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại.');
    }

    // Gửi request tạo cuộc trò chuyện
    const response = await apiClient.post(
      '/chats/contact',
      {postId, receiverId}, // Payload gửi lên server
      {
        headers: {
          Authorization: `Bearer ${token}`, // Header xác thực
          'Content-Type': 'application/json', // Đảm bảo đúng định dạng Content-Type nếu server yêu cầu
        },
      },
    );

    return response.data;
  } catch (error) {
    // Ẩn thông báo lỗi bằng cách không log ra console và xử lý im lặng
    throw error; // Hoặc có thể return null hoặc giá trị khác nếu muốn xử lý khác
  }
};

export const deleteConversation = async conversationId => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại.');
    }

    await apiClient.delete(`/chats/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // Ẩn thông báo lỗi bằng cách không log ra console và xử lý im lặng
    throw error; // Hoặc có thể return null hoặc giá trị khác nếu muốn xử lý khác
  }
};
