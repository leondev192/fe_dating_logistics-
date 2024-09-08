// src/apis/services/userService.ts
import apiClient from '../apiClient';
import {UpdateUserRequest} from '../../models/userModel';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage để lấy token

// Hàm để lấy thông tin người dùng từ API với token JWT
export const getUserInfo = async (token: string) => {
  try {
    const response = await apiClient.get('/user/get-info', {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token vào header của yêu cầu
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Hàm để cập nhật thông tin người dùng
export const updateUser = async (data: UpdateUserRequest) => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('Token không tồn tại, không thể cập nhật thông tin.');
      throw new Error('Token is missing.');
    }

    console.log('Updating user with data:', data); // Log dữ liệu gửi đi để cập nhật
    const response = await apiClient.patch('/user/update-info', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token vào header của yêu cầu
      },
    });
    console.log('Update response:', response.data); // Log phản hồi thành công
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    if (error) {
      throw error;
    }
  }
};
