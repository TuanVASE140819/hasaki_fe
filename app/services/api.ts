import axios from "axios";
import { tokenService } from "./token";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ProfileResponse,
  ProfileUpdateRequest,
} from "../types/auth";
import { CategoryResponse } from "../types/category";

const BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
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
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      tokenService.removeToken();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", {
      username,
      password,
    });
    return response.data;
  },

  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", {
      username,
      password,
    });
    if (response.data.data.token) {
      tokenService.setToken(response.data.data.token);
      tokenService.setUser(response.data.data.user);
    }
    return response.data;
  },

  logout: () => {
    tokenService.removeToken();
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  },

  getProfile: async (): Promise<AuthResponse> => {
    const response = await api.get<AuthResponse>("/auth/profile");
    return response.data;
  },

  updateProfile: async (data: ProfileUpdateRequest): Promise<AuthResponse> => {
    const response = await api.put<AuthResponse>("/auth/profile", data);
    return response.data;
  },
};

export const categoryApi = {
  getCategories: async () => {
    try {
      const response = await api.get("/categories");
      console.log("API Response:", response); // Log response
      return response.data; // Trả về trực tiếp data từ response
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  getCategoryById: async (id: string) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};

export default api;
