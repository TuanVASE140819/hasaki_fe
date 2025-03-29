"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tokenService } from "../../services/token";

const menuItems = [
  {
    title: "Quản lý tài khoản",
    items: [
      { label: "Hasaki tích điểm", href: "/account/points" },
      { label: "Thông tin tài khoản", href: "/account/profile" },
      { label: "Đơn hàng của tôi", href: "/account/orders" },
      { label: "Booking của tôi", href: "/account/bookings" },
      { label: "Sổ địa chỉ nhận hàng", href: "/account/addresses" },
      { label: "Danh sách yêu thích", href: "/account/wishlist" },
      { label: "Mua lại", href: "/account/repurchase" },
      { label: "Hỏi đáp", href: "/account/questions" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const user = tokenService.getUser();

  return (
    <div className="w-full max-w-xs">
      {/* User info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl text-gray-500">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-lg font-medium">Chào {user?.name}</h2>
          <Link
            href="/account/profile"
            className="text-sm text-primary hover:text-primary-dark"
          >
            Chỉnh sửa tài khoản
          </Link>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-6">
        {menuItems.map((section, index) => (
          <div key={index}>
            <h3 className="font-medium text-gray-900 mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    href={item.href}
                    className={`block py-2 px-3 rounded-lg text-sm ${
                      pathname === item.href
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
