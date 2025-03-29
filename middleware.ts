import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Các route cần xác thực
  const protectedRoutes = ["/account", "/cart"];

  // Các route dành cho khách
  const authRoutes = ["/auth/login", "/auth/register"];

  // Nếu đã đăng nhập và cố truy cập trang đăng nhập/đăng ký
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Nếu chưa đăng nhập và cố truy cập trang cần xác thực
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/cart/:path*", "/auth/login", "/auth/register"],
};
