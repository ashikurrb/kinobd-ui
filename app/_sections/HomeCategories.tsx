"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface Categories {
  id: string;
  name: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  subCategories: subCategory[];
}

interface subCategory {
  id: string;
  name: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function HomeCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get<Categories[]>("/categories.json");
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="lg:px-30 xl:px-60 px-5 pt-15 space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header with Navigation Arrows */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-[#1a2d2e] dark:text-white">
          Categories
        </h2>

        <div className="flex gap-2">
          <button
            id="prev-btn"
            className="w-8 h-8 flex items-center justify-center bg-[#1a2d2e] text-white hover:bg-opacity-90 transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            id="next-btn"
            className="w-8 h-8 flex items-center justify-center bg-[#ff781f] text-white hover:bg-opacity-90 transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          prevEl: "#prev-btn",
          nextEl: "#next-btn",
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="flex border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm h-full rounded-sm">
              {/* Image Section */}
              <div className="w-1/2 overflow-hidden relative min-h-35">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="w-1/2 p-4 flex flex-col justify-start">
                <h3 className="font-bold text-[#1a2d2e] dark:text-white mb-2 text-sm lg:text-base truncate">
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {category.subCategories.slice(0, 3).map((sub, i) => (
                    <li
                      key={i}
                      className="flex items-center text-xs text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-cyan-500 mr-2 shrink-0"></span>
                      <span className="truncate">
                        <Link
                          href={`/category/${category.slug}/${sub.slug}`}
                          className="hover:underline"
                        >
                          {sub.name}
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/category/${category.slug}`}
                  className="mt-2 text-xs text-orange-500 hover:underline font-medium"
                >
                  More...
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
