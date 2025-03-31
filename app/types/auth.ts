export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ProfileResponse {
  success: boolean;
  user: User;
}

export interface ProfileUpdateRequest {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
}
