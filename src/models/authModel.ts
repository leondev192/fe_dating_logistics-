export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    username: string;
    token: string;
  };
}
export interface RegisterRequest {
  identifier: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}
export interface VerifyOtpRequest {
  identifier: string;
  otp: string;
}

export interface VerifyOtpResponse {
  status: string;
  message: string;
  data: {
    username: string;
  };
}

export interface ForgotPasswordRequest {
  identifier: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface VerifyOtpResetPasswordRequest {
  identifier: string;
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
