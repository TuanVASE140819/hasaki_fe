# Hasaki Frontend

Frontend cho website bán mỹ phẩm Hasaki sử dụng Next.js 14, TypeScript và Tailwind CSS.

## Công nghệ sử dụng

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- JWT Authentication

## Tính năng

- Đăng nhập/Đăng ký
- Xác thực người dùng với JWT (Access Token & Refresh Token)
- Responsive design
- Trang profile người dùng
- Trang chủ hiển thị sản phẩm
- Giỏ hàng

## Cài đặt

1. Clone repository:

```bash
git clone https://github.com/TuanVASE140819/hasaki_fe.git
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file .env.local và thêm các biến môi trường:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Chạy development server:

```bash
npm run dev
```

## Cấu trúc thư mục

```
├── app/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── types/         # TypeScript types
│   └── ...
├── public/            # Static files
└── ...
```

## API Endpoints

- POST /auth/register - Đăng ký tài khoản mới
- POST /auth/login - Đăng nhập
- POST /auth/refresh-token - Làm mới access token
- POST /auth/logout - Đăng xuất
- GET /auth/profile - Lấy thông tin người dùng

## Contributing

Mọi đóng góp đều được chào đón. Vui lòng tạo issue hoặc pull request.
