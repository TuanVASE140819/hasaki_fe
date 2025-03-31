"use client";

import { useEffect, useState } from "react";
import { categoryApi } from "../../services/api";
import { Category } from "../../types/category";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getCategories();
      console.log("Categories response:", response);

      if (Array.isArray(response)) {
        console.log("Setting categories:", response);
        setCategories(response);
      } else if (response.data && Array.isArray(response.data)) {
        console.log("Setting categories from response.data:", response.data);
        setCategories(response.data);
      } else {
        console.error("Invalid response structure:", response);
        toast.error("Cấu trúc dữ liệu không hợp lệ");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current categories state:", categories);
  }, [categories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  console.log("Rendering categories:", categories);

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Không có danh mục nào
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => {
        console.log("Rendering category:", category);
        return (
          <Link
            key={category.id}
            href={`/danh-muc/${category.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={category.imageUrl || "/placeholder-image.jpg"}
                alt={category.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
