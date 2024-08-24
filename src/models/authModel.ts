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
