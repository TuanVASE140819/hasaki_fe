import axios from "axios";
import { tokenService } from "./token";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ProfileResponse,
} from "../types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5010";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenService.getRefreshToken();
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        tokenService.setTokens(accessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        tokenService.clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", data);
      const { accessToken, refreshToken, user } = response.data;
      tokenService.setTokens(accessToken, refreshToken);
      tokenService.setUser(user);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: () => {
    tokenService.clearTokens();
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get<ProfileResponse>("/auth/profile");
    return response.data;
  },
};

export default api;
