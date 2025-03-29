"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShoppingCartIcon,
  UserIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { authApi } from "../../services/api";
import { tokenService } from "../../services/token";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = tokenService.getUser();
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name);
    }

    // Thêm event listener để đóng dropdown khi click ra ngoài
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authApi.logout();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-primary text-white">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-secondary to-[#FF9900] py-2">
        <div className="container">
          <p className="text-center text-xs sm:text-sm">
            Giao nhanh miễn phí 2H - Freeship toàn quốc từ 90K
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-white">
              HASAKI
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Search */}
          <div className="hidden lg:block flex-grow max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm sản phẩm, thương hiệu bạn mong muốn..."
                className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-2"
                  onClick={toggleDropdown}
                >
                  <UserIcon className="h-6 w-6" />
                  <div>
                    <p className="text-sm">{userName}</p>
                    <p className="text-xs">Tài khoản</p>
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/account/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Thông tin tài khoản
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Đơn hàng của tôi
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="flex items-center gap-2">
                <UserIcon className="h-6 w-6" />
                <div>
                  <p className="text-sm">Đăng nhập</p>
                  <p className="text-xs">Tài khoản</p>
                </div>
              </Link>
            )}

            <Link href="/cart" className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </div>
              <span className="text-sm">Giỏ hàng</span>
            </Link>

            <a href="tel:1800-6800" className="flex items-center gap-2">
              <PhoneIcon className="h-6 w-6" />
              <div>
                <p className="text-sm">1800-6800</p>
                <p className="text-xs">Hỗ trợ 24/7</p>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white text-gray-800 rounded-lg shadow-lg p-4">
            <div className="space-y-4">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/account/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Thông tin tài khoản
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-4 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Đơn hàng của tôi
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
              <Link
                href="/cart"
                className="block px-4 py-2 hover:bg-gray-100 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Giỏ hàng
              </Link>
              <a
                href="tel:1800-6800"
                className="block px-4 py-2 hover:bg-gray-100 rounded"
              >
                Hotline: 1800-6800
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="border-t border-[#2D795C]">
        <div className="container">
          <ul className="flex items-center gap-4 sm:gap-6 py-2 overflow-x-auto whitespace-nowrap">
            <li>
              <Link href="/danh-muc" className="text-sm hover:text-yellow-300">
                Danh mục
              </Link>
            </li>
            <li>
              <Link
                href="/thuong-hieu"
                className="text-sm hover:text-yellow-300"
              >
                Thương hiệu
              </Link>
            </li>
            <li>
              <Link
                href="/hang-moi-ve"
                className="text-sm hover:text-yellow-300"
              >
                Hàng mới về
              </Link>
            </li>
            <li>
              <Link href="/ban-chay" className="text-sm hover:text-yellow-300">
                Bán chạy
              </Link>
            </li>
            <li>
              <Link
                href="/khuyen-mai"
                className="text-sm hover:text-yellow-300"
              >
                Khuyến mãi
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
