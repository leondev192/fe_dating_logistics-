import apiClient from '../apiClient';
import {Post} from '../../models/postModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throwing the error to handle it in the calling code
  }
};

export const createPost = async (post: Post): Promise<Post> => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('Token không tồn tại, không thể tạo bài đăng.');
      throw new Error('Token is missing.');
    }

    console.log('Creating post with data:', post); // Log dữ liệu gửi đi để tạo bài đăng

    // Gửi yêu cầu POST với token trong header
    const response = await apiClient.post<Post>('/posts', post, {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token vào header của yêu cầu
      },
    });

    console.log('Create post response:', response.data); // Log phản hồi thành công
    return response.data; // Đảm bảo trả về dữ liệu
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // Re-throwing the error to handle it in the calling code
  }
};

export const getUserPosts = async (): Promise<Post[]> => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('Token không tồn tại, không thể lấy bài đăng của user.');
      throw new Error('Token is missing.');
    }

    // Gửi yêu cầu GET với token trong header
    const response = await apiClient.get<Post[]>('/posts/user/posts', {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token vào header của yêu cầu
      },
    });

    return response.data; // Trả về dữ liệu bài đăng
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error; // Re-throwing the error to handle it in the calling code
  }
};

// Hàm xóa bài đăng
export const deletePost = async (postId: string): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Token is missing.');
    }
    await apiClient.delete(`/posts/${postId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Hàm cập nhật bài đăng
export const updatePost = async (postId: string, post: Post): Promise<Post> => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Token is missing.');
    }

    // Log chi tiết dữ liệu gửi đi để kiểm tra trước khi gửi
    console.log('Updating post with ID:', postId, 'Data:', post);

    // Gửi yêu cầu PATCH với token trong header
    const response = await apiClient.patch<Post>(`/posts/${postId}`, post, {
      headers: {
        Authorization: `Bearer ${token}`, // Đảm bảo truyền đúng token
      },
    });

    console.log('Update post response:', response.data); // Log phản hồi từ server
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error); // Log chi tiết lỗi
    throw error;
  }
};

// Trong postService.ts
export const getPostById = async (id: string): Promise<Post> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('Token is missing.');
    }
    const response = await apiClient.get<Post>(`/posts/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};
