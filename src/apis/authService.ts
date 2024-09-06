import apiClient from './apiClient';
import {
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyOtpResetPasswordRequest,
  VerifyOtpResetPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '../models/authModel';

export const loginVendor = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>(
      '/auth/forgot-password',
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtpResetPassword = async (
  data: VerifyOtpResetPasswordRequest,
): Promise<VerifyOtpResetPasswordResponse> => {
  try {
    const response = await apiClient.post<VerifyOtpResetPasswordResponse>(
      '/auth/verify-otp-forgot-password',
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post<ResetPasswordResponse>(
      '/auth/reset-password',
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    console.log('API Request Data:', data);
    const response = await apiClient.post<RegisterResponse>(
      '/auth/register',
      data,
    );
    console.log('API Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.response) {
      console.error('API Error Response:', error.response.data);
    }
    throw error;
  }
};

export const verifyOtp = async (
  data: VerifyOtpRequest,
): Promise<VerifyOtpResponse> => {
  try {
    // Log dữ liệu yêu cầu gửi lên API
    console.log('Verify OTP API Request Data:', data);

    // Gọi API xác thực OTP
    const response = await apiClient.post<VerifyOtpResponse>(
      '/auth/verify-otp',
      data,
    );

    // Log phản hồi từ API
    console.log('Verify OTP API Response:', response.data);
    return response.data;
  } catch (error: any) {
    // Log lỗi xảy ra
    console.error('Verify OTP API Error:', error);

    // Log chi tiết phản hồi lỗi từ API nếu có
    if (error.response) {
      console.error('Verify OTP API Error Response:', error.response.data);
    }
    throw error; // Ném lỗi ra ngoài để xử lý tiếp
  }
};
