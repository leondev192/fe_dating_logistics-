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

// chatService.ts
export const markMessagesAsRead = async conversationId => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại.');
    }

    console.log(
      `Sending request to mark messages as read for conversation: ${conversationId}`,
    );

    // Gọi API backend để đánh dấu tin nhắn là đã đọc
    const response = await apiClient.post(
      `/chats/${conversationId}/mark-as-read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Messages marked as read successfully:', response.data);
  } catch (error) {
    console.warn('Không thể đánh dấu tin nhắn là đã đọc.', error);
  }
};
// Lấy thông tin chi tiết của cuộc trò chuyện (bao gồm contractImageUrl)
export const getConversationDetails = async (conversationId: string) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại.');
    }

    const response = await apiClient.get(`/chats/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // console.error('Error fetching conversation details:', error);
    throw error;
  }
};

// Cập nhật URL ảnh hợp đồng cho cuộc trò chuyện
export const updateContractImage = async (
  conversationId: string,
  imageUrl: string,
) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Vui lòng đăng nhập lại.');
    }

    const response = await apiClient.patch(
      `/chats/${conversationId}/contract-image`,
      {imageUrl},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    // console.error('Error updating contract image:', error);
    throw error;
  }
};
