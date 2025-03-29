"use client";

import { useEffect, useState } from "react";
import { User } from "../../../types/auth";
import { authApi } from "../../../services/api";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.getProfile();
        setUser(response.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center text-red-500">
          Không thể tải thông tin người dùng
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Thông tin tài khoản</h1>

        <div className="space-y-4">
          <div className="flex items-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-500">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Họ và tên
              </label>
              <div className="mt-1 text-lg">{user.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <div className="mt-1 text-lg">{user.email}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Mã khách hàng
              </label>
              <div className="mt-1 text-lg">
                {user.customerCode || "Chưa có"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Vai trò
              </label>
              <div className="mt-1 text-lg capitalize">{user.role}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Ngày tham gia
              </label>
              <div className="mt-1 text-lg">
                {new Date(user.createdAt._seconds * 1000).toLocaleDateString(
                  "vi-VN"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
