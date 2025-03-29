import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/home/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  "https://placehold.co/1920x600/1A6744/FFFFFF/png?text=Banner+1",
  "https://placehold.co/1920x600/FF6B00/FFFFFF/png?text=Banner+2",
  "https://placehold.co/1920x600/2D795C/FFFFFF/png?text=Banner+3",
];

const categories = [
  {
    id: 1,
    name: "Chăm sóc da mặt",
    image: "https://placehold.co/400/1A6744/FFFFFF/png?text=Cham+soc+da+mat",
  },
  {
    id: 2,
    name: "Trang điểm",
    image: "https://placehold.co/400/1A6744/FFFFFF/png?text=Trang+diem",
  },
  {
    id: 3,
    name: "Chăm sóc tóc",
    image: "https://placehold.co/400/1A6744/FFFFFF/png?text=Cham+soc+toc",
  },
  {
    id: 4,
    name: "Nước hoa",
    image: "https://placehold.co/400/1A6744/FFFFFF/png?text=Nuoc+hoa",
  },
  {
    id: 5,
    name: "Chăm sóc cơ thể",
    image: "https://placehold.co/400/1A6744/FFFFFF/png?text=Cham+soc+co+the",
  },
  {
    id: 6,
    name: "Thực phẩm chức năng",
    image: "https://placehold.co/400/1A6744/FFFFFF/png?text=TPCN",
  },
];

const products = [
  {
    id: 1,
    name: "Nước Tẩy Trang L'Oreal Tươi Mát Cho Da Dầu",
    price: 159000,
    originalPrice: 239000,
    discount: 33,
    image: "https://placehold.co/400/FFFFFF/1A6744/png?text=Nuoc+tay+trang",
  },
  {
    id: 2,
    name: "Kem Chống Nắng Skin1004 Cho Da Nhạy Cảm",
    price: 299000,
    originalPrice: 445000,
    discount: 33,
    image: "https://placehold.co/400/FFFFFF/1A6744/png?text=Kem+chong+nang",
  },
  {
    id: 3,
    name: "Serum The Ordinary Niacinamide 10% + Zinc 1%",
    price: 245000,
    originalPrice: 350000,
    discount: 30,
    image: "https://placehold.co/400/FFFFFF/1A6744/png?text=Serum",
  },
  {
    id: 4,
    name: "Sữa Rửa Mặt CeraVe Sạch Sâu",
    price: 259000,
    originalPrice: 389000,
    discount: 33,
    image: "https://placehold.co/400/FFFFFF/1A6744/png?text=Sua+rua+mat",
  },
  {
    id: 5,
    name: "Kem Dưỡng La Roche-Posay Cicaplast Baume B5",
    price: 289000,
    originalPrice: 419000,
    discount: 31,
    image: "https://placehold.co/400/FFFFFF/1A6744/png?text=Kem+duong",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
      <section className="relative">
        <div className="aspect-[16/5] w-full relative">
          <Image
            src={banners[0]}
            alt="Banner 1"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Categories */}
      <section className="container py-8">
        <h2 className="text-2xl font-semibold mb-6">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/danh-muc/${category.id}`}
              className="group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center mt-2 text-sm font-medium">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="bg-red-50 py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-red-600">Flash Sale</h2>
            <Link href="/flash-sale" className="text-red-600 hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="container py-8">
        <h2 className="text-2xl font-semibold mb-6">Thương hiệu nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Link
              key={index}
              href={`/thuong-hieu/${index + 1}`}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={`https://placehold.co/400x200/1A6744/FFFFFF/png?text=Brand+${
                    index + 1
                  }`}
                  alt={`Brand ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
