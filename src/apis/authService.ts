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
} from '../models/authModel';

export const loginVendor = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      '/auth/vendor/login',
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Quên mật khẩu (Gửi yêu cầu OTP)
export const forgotPassword = async (
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>(
      '/auth/vendor/forgot-password',
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xác thực OTP để nhận token cho reset mật khẩu
export const verifyOtpResetPassword = async (
  data: VerifyOtpResetPasswordRequest,
): Promise<VerifyOtpResetPasswordResponse> => {
  try {
    const response = await apiClient.post<VerifyOtpResetPasswordResponse>(
      '/auth/vendor/verify-otp-resetpassword',
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đặt lại mật khẩu
export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post<ResetPasswordResponse>(
      '/auth/vendor/resetpassword',
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
