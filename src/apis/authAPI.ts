// src/apis/authAPI.ts
import apiClient from './apiClient';

export const loginVendor = async (data: {
  identifier: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post('/auth/vendor/login', data);
    console.log('Phản hồi từ API:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
