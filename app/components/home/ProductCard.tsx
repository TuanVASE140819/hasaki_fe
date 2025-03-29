"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <Link href={`/san-pham/${id}`}>
        <div className="relative aspect-square mb-4">
          <Image src={image} alt={name} fill className="object-contain" />
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-red-600 font-semibold">
            {price.toLocaleString()}đ
          </span>
          {originalPrice > price && (
            <span className="text-gray-400 text-sm line-through">
              {originalPrice.toLocaleString()}đ
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
