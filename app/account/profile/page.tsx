"use client";

import { useState, useEffect } from "react";
import { User } from "../../../types/auth";
import { authApi } from "../../../services/api";
import Sidebar from "../../components/account/Sidebar";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.getProfile();
        setUser(response.user);
        setFormData({
          name: response.user.name,
          email: response.user.email,
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  };

  const handleSave = async () => {
    try {
      // TODO: Implement update profile API
      // const response = await authApi.updateProfile(formData);
      // setUser(response.user);
      setIsEditing(false);
      setError("");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Không thể cập nhật thông tin");
    }
  };

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
          {error || "Không thể tải thông tin người dùng"}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Thông tin tài khoản</h1>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="text-primary hover:text-primary-dark"
                >
                  Chỉnh sửa
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Lưu
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Basic info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Họ và tên
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  ) : (
                    <div className="mt-1 text-lg">{user.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  ) : (
                    <div className="mt-1 text-lg">{user.email}</div>
                  )}
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
                    Ngày tham gia
                  </label>
                  <div className="mt-1 text-lg">
                    {new Date(
                      user.createdAt._seconds * 1000
                    ).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>

              {/* Newsletter subscription */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-medium mb-4">
                  Tùy chọn đăng ký, cập nhật thông tin khuyến mãi
                </h2>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isSubscribed}
                    onChange={(e) => setIsSubscribed(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Đăng ký</span>
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
