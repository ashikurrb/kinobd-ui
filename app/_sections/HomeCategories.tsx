"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function HomeCategories() {
  const categorys = [
    {
      id: 12369,
      name: "Electronics",
      href: "#",
      imageSrc: "/banner/electronics.png",
      subCategories: [
        { name: "Phone" },
        { name: "Gadgets" },
        { name: "Accessories" },
      ],
    },
    {
      id: 12370,
      name: "Apparel",
      href: "#",
      imageSrc: "/banner/electronics.png",
      subCategories: [
        { name: "Phone" },
        { name: "Gadgets" },
        { name: "Accessories" },
      ],
    },
    {
      id: 12371,
      name: "Home Appliance",
      href: "#",
      imageSrc: "/banner/electronics.png",
      subCategories: [
        { name: "Phone" },
        { name: "Gadgets" },
        { name: "Accessories" },
      ],
    },
    {
      id: 12372,
      name: "Gadget",
      href: "#",
      imageSrc: "/banner/electronics.png",
      subCategories: [
        { name: "Phone" },
        { name: "Gadgets" },
        { name: "Accessories" },
      ],
    },
    {
      id: 12373,
      name: "Furniture",
      href: "#",
      imageSrc: "/banner/electronics.png",
      subCategories: [
        { name: "Phone" },
        { name: "Gadgets" },
        { name: "Accessories" },
      ],
    },
    {
      id: 12374,
      name: "Building",
      href: "#",
      imageSrc: "/banner/electronics.png",
      subCategories: [
        { name: "Phone" },
        { name: "Gadgets" },
        { name: "Accessories" },
      ],
    },
    {
      id: 12375,
      name: "Materials",
      href: "#",
      imageSrc: "/banner/electronics.png",
      subCategories: [
        { name: "Phone" },
        { name: "Gadgets" },
        { name: "Accessories" },
      ],
    },
  ];

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
        {categorys.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="flex border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm h-full rounded-sm">
              {/* Image Section */}
              <div className="w-1/2 overflow-hidden relative min-h-35">
                <Image
                  src={category.imageSrc}
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
                      <span className="truncate">{sub.name}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={category.href}
                  className="mt-2 text-xs text-orange-500 hover:underline font-medium"
                >
                  More...
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
