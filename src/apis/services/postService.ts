import apiClient from '../apiClient';
import {Post} from '../../models/postModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
  } catch (error) {
    console.warn('Không thể lấy danh sách bài đăng. Vui lòng thử lại sau.');
    return []; // Trả về danh sách rỗng hoặc xử lý phù hợp hơn nếu cần
  }
};

export const createPost = async (post: Post): Promise<Post | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('Vui lòng đăng nhập lại.');
      return null;
    }

    const response = await apiClient.post<Post>('/posts', post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.warn('Không thể tạo bài đăng. Vui lòng thử lại sau.');
    return null; // Trả về null nếu lỗi
  }
};

export const getUserPosts = async (): Promise<Post[]> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('Vui lòng đăng nhập lại.');
      return [];
    }

    const response = await apiClient.get<Post[]>('/posts/user/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.warn(
      'Không thể lấy danh sách bài đăng của bạn. Vui lòng thử lại sau.',
    );
    return [];
  }
};

export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('Vui lòng đăng nhập lại.');
      return false;
    }

    await apiClient.delete(`/posts/${postId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });

    return true;
  } catch (error) {
    console.warn('Không thể xóa bài đăng. Vui lòng thử lại sau.');
    return false;
  }
};

export const updatePost = async (
  postId: string,
  post: Post,
): Promise<Post | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('Vui lòng đăng nhập lại.');
      return null;
    }

    const response = await apiClient.patch<Post>(`/posts/${postId}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.warn('Không thể cập nhật bài đăng. Vui lòng thử lại sau.');
    return null;
  }
};

export const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('Vui lòng đăng nhập lại.');
      return null;
    }

    const response = await apiClient.get<Post>(`/posts/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  } catch (error) {
    console.warn('Không thể lấy chi tiết bài đăng. Vui lòng thử lại sau.');
    return null;
  }
};
