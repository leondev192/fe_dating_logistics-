import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://dvq.onrender.com/api/v1',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default apiClient;
