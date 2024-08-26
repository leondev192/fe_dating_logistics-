// src/apis/axiosConfig.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Sử dụng AsyncStorage

const axiosConfig = axios.create({
  baseURL: 'http://192.168.31.20:4000/api', // Đảm bảo đây là URL chính xác của API
  timeout: 10000,
});

axiosConfig.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@token'); // Sử dụng AsyncStorage để lấy token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosConfig.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default axiosConfig;
