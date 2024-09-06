export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
  };
}
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  status: string;
  message: string;
  data: {
    email: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface VerifyOtpResetPasswordRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResetPasswordResponse {
  status: string;
  message: string;
  token: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
}
