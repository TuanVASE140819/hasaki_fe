"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1A6744] text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Về Hasaki */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Về Hasaki</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/gioi-thieu"
                  className="text-sm hover:text-yellow-300"
                >
                  Giới thiệu về Hasaki
                </Link>
              </li>
              <li>
                <Link
                  href="/he-thong-cua-hang"
                  className="text-sm hover:text-yellow-300"
                >
                  Hệ thống cửa hàng
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-sm hover:text-yellow-300">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/tuyen-dung"
                  className="text-sm hover:text-yellow-300"
                >
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/huong-dan-mua-hang"
                  className="text-sm hover:text-yellow-300"
                >
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-doi-tra"
                  className="text-sm hover:text-yellow-300"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-giao-hang"
                  className="text-sm hover:text-yellow-300"
                >
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/phuong-thuc-thanh-toan"
                  className="text-sm hover:text-yellow-300"
                >
                  Phương thức thanh toán
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                Hotline:{" "}
                <a href="tel:1800-6800" className="hover:text-yellow-300">
                  1800-6800
                </a>
              </li>
              <li className="text-sm">
                Email:{" "}
                <a
                  href="mailto:cskh@hasaki.vn"
                  className="hover:text-yellow-300"
                >
                  cskh@hasaki.vn
                </a>
              </li>
              <li className="text-sm">
                Địa chỉ: 40-42 Ngô Đức Kế, P. Bến Nghé, Q.1, TP.HCM
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://facebook.com/hasaki"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com/hasaki"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com/hasaki"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Chứng nhận */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Chứng nhận</h3>
            <div className="space-y-4">
              <Image
                src="/certification.png"
                alt="Chứng nhận Bộ Công Thương"
                width={150}
                height={57}
                className="bg-white p-2 rounded"
              />
              <Image
                src="/payment-methods.png"
                alt="Phương thức thanh toán"
                width={200}
                height={50}
                className="bg-white p-2 rounded"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#2D795C] mt-8 pt-6">
          <p className="text-sm text-center">
            © 2024 Hasaki.vn - Hệ thống phân phối mỹ phẩm chính hãng, dược mỹ
            phẩm, chăm sóc sức khỏe và làm đẹp hàng đầu Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
