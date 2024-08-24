import {useState} from 'react';
import {loginVendor} from '../apis/authAPI';
import {LoginRequest, LoginResponse} from '../models/authModel';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest): Promise<LoginResponse | null> => {
    setLoading(true);
    try {
      const response = await loginVendor(data);
      setLoading(false);
      return response;
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.');
      setLoading(false);
      return null;
    }
  };

  return {login, loading, error};
};
