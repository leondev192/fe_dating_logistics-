import apiClient from '../apiClient';
import {UpdateUserRequest} from '../../models/userModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async (token: string) => {
  try {
    const response = await apiClient.get('/user/get-info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};

export const updateUser = async (data: UpdateUserRequest) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      return null;
    }

    const response = await apiClient.patch('/user/update-info', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};
