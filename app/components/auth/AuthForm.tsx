"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authApi } from "../../services/api";
import { AuthError } from "../../types/auth";

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<AuthError>({
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ message: "" });

    try {
      if (type === "register") {
        await authApi.register(formData);
        await router.push("/auth/login?registered=true");
      } else {
        const response = await authApi.login({
          email: formData.email,
          password: formData.password,
        });
        if (response.success) {
          window.location.href = "/";
        }
      }
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        };
        setErrors({
          message: err.response?.data?.message || "Có lỗi xảy ra",
          errors: err.response?.data?.errors,
        });
      } else {
        setErrors({
          message: "Có lỗi xảy ra",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type === "login" ? "Đăng nhập" : "Đăng ký"}
          </h2>
          {searchParams.get("registered") && (
            <div className="mt-2 text-center text-sm text-green-600">
              Đăng ký thành công! Vui lòng đăng nhập.
            </div>
          )}
          {errors.message && (
            <div className="mt-2 text-center text-sm text-red-600">
              {errors.message}
            </div>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {type === "register" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Họ và tên
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              {errors.errors?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.errors.name[0]}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            {errors.errors?.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  type === "login" ? "current-password" : "new-password"
                }
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            {errors.errors?.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.errors.password[0]}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : type === "login" ? (
                "Đăng nhập"
              ) : (
                "Đăng ký"
              )}
            </button>
          </div>

          <div className="text-sm text-center">
            {type === "login" ? (
              <>
                Chưa có tài khoản?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Đăng ký ngay
                </Link>
              </>
            ) : (
              <>
                Đã có tài khoản?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
