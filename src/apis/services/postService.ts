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
