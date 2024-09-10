import apiClient from '../apiClient';
import {Post} from '../../models/postModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
  } catch {
    return [];
  }
};

export const createPost = async (post: Post): Promise<Post | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      return null;
    }

    const response = await apiClient.post<Post>('/posts', post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

export const getUserPosts = async (): Promise<Post[]> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      return [];
    }

    const response = await apiClient.get<Post[]>('/posts/user/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    return [];
  }
};

export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      return false;
    }

    await apiClient.delete(`/posts/${postId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });

    return true;
  } catch {
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
      return null;
    }

    const response = await apiClient.patch<Post>(`/posts/${postId}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

export const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      return null;
    }

    const response = await apiClient.get<Post>(`/posts/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  } catch {
    return null;
  }
};
