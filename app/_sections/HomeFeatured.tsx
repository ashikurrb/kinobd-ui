"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

//define type
interface Product {
  id: string;
  featuredProduct: boolean;
  newArrival: boolean;
  name: string;
  img: string;
  price: number;
  rating: number;
  features: string[];
}

export default function HomeFeatured() {
  const [isFeaturedProducts, setIsFeaturedProducts] = useState<Product[]>([]);
  const [isNewArrivals, setIsNewArrivals] = useState<Product[]>([]);


  const getFeaturedProducts = async () => {
    try {
      const { data } = await axios.get<Product[]>("/product.json");

      const featured: Product[] = [];
      const newArrivals: Product[] = [];

      for (const product of data) {
        if (product.featuredProduct === true) featured.push(product);
        if (product.newArrival === true) newArrivals.push(product);
      }

      setIsFeaturedProducts(featured);
      setIsNewArrivals(newArrivals);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <div className="lg:px-10 xl:px-20 px-5 pt-15 space-y-6 text-slate-900 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Product Section */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-[#1a2d2e] dark:text-white">
              Featured Products
            </h2>
            <div className="flex gap-2 mb-1">
              <button
                id="featured-prev"
                className="w-8 h-8 flex items-center justify-center bg-[#1a2d2e] text-white hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                id="featured-next"
                className="w-8 h-8 flex items-center justify-center bg-[#ff781f] text-white hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider Section */}
          <div className="relative min-h-[41vh]">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: "#featured-prev",
                nextEl: "#featured-next",
              }}
              className="rounded-sm border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
            >
              {isFeaturedProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div
                    className="
  relative flex flex-col md:flex-row
  bg-[url('/featuredLayer.svg')] bg-no-repeat bg-cover bg-center
  dark:bg-none dark:bg-[#171717]
"
                  >
                    {/* Left Content */}
                    <div className="w-full md:w-3/5 p-8 flex flex-col justify-center order-2 md:order-1">
                      <h3 className="text-2xl font-bold text-[#1a2d2e] dark:text-white mb-4 leading-tight">
                        {product.name}
                      </h3>

                      <div className="flex items-center mb-6">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-[#ffb400] text-[#ffb400]"
                          />
                        ))}
                        <Star size={16} className="text-[#ffb400] opacity-50" />
                      </div>

                      <ul className="space-y-2 mb-10">
                        {product.features.map((feature: [], i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium"
                          >
                            <span className="text-xl leading-none -mt-0.5">
                              •
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap items-center justify-between gap-6 lg:gap-10">
                        <span className="text-2xl font-semibold text-[#00a99d]">
                          ৳ {product.price}
                        </span>
                        <button className="bg-[#ff781f] text-white px-3 py-3 rounded-lg flex items-center gap-2 hover:bg-[#e66a1a] transition-colors font-bold text-sm uppercase tracking-wider shadow-md active:scale-95 cursor-pointer">
                          <ShoppingCart size={18} />
                          Buy Now
                        </button>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full md:w-2/5 relative flex items-center justify-center px-6 pt-8 order-1 md:order-2">
                      <div className="relative lg:w-full w-1/2 aspect-square max-w-80">
                        <Image
                          src={product.img}
                          alt={product.name}
                          width={304}
                          height={304}
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* New Arrival */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-[#1a2d2e] dark:text-white">
              New Arrivals
            </h2>

            <div className="flex gap-2">
              <button
                id="new-arrival-prev"
                className="w-8 h-8 flex items-center justify-center bg-[#1a2d2e] text-white hover:bg-opacity-90 transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                id="new-arrival-next"
                className="w-8 h-8 flex items-center justify-center bg-[#ff781f] text-white hover:bg-opacity-90 transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={15}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation={{
                prevEl: "#new-arrival-prev",
                nextEl: "#new-arrival-next",
              }}
              className="pb-4"
            >
              {isNewArrivals.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card className="rounded-sm shadow-none group py-4 min-h-[41vh]">
                    <CardHeader>
                      <div className="relative aspect-square mx-auto w-1/2 lg:w-full py-5 lg:py-0 flex items-center justify-center">
                        <Image
                          src={product.img}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </CardHeader>

                    <CardContent className="px-4 space-y-2">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="fill-orange-400 text-orange-400"
                          />
                        ))}
                        <Star
                          size={14}
                          className="text-orange-400 opacity-40"
                        />
                        <span className="ml-2 text-xs text-gray-500 font-medium">
                          {product.rating}
                        </span>
                      </div>

                      <h3 className="text-[15px] font-bold dark:text-white text-[#1a2d2e] leading-tight min-h-10 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="font-bold text-lg text-[#00a99d]">
                        {product.price}৳
                      </p>
                    </CardContent>

                    <CardFooter className="flex justify-between gap-6 px-4">
                      <Button
                        className="flex-1 bg-[#1a2d2e] hover:bg-[#2a3d3e]
                       text-white rounded-sm text-xs gap-2 px-2 cursor-pointer"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Heart size={20} className="text-gray-400" />
                      </Button>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
