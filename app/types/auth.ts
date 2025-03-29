export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
  customerCode?: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ProfileResponse {
  success: boolean;
  user: User;
}
