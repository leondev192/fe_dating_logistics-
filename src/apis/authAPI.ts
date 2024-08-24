// src/apis/authAPI.ts
import apiClient from './apiClient';

export const loginVendor = async (data: {
  identifier: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post('/auth/vendor/login', data);
    console.log('Phản hồi từ API:', response.data); // Log phản hồi từ API
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error); // Log lỗi nếu có
    throw error;
  }
};
