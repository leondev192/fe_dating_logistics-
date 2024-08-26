export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    id: string;
    username: string;
    token: string;
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
