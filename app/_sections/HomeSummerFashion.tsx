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
export default function HomeSummerFashion() {
  const [isFeaturedProducts, setIsFeaturedProducts] = useState<Product[]>([]);
  const [isNewArrivals, setIsNewArrivals] = useState<Product[]>([]);

  const getFeaturedProducts = async () => {
    try {
      const { data } = await axios.get<Product[]>("/product.json");

      const featured: Product[] = data.filter(
        (product) => product.featuredProduct === true,
      );
      const newArrivals: Product[] = data.filter(
        (product) => product.newArrival === true,
      );

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
    <div className="lg:pt-25 pt-15 space-y-6 text-slate-900 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-15 items-stretch">
        <div className="flex flex-col h-full">
          <div className="mb-6 h-8 hidden lg:block"></div>

          <div className="relative grow rounded-sm overflow-hidden bg-[url('/layer3.png')] bg-fit bg-no-repeat bg-cover flex flex-col md:flex-row items-center justify-between p-8 lg:p-12 md:min-h-100 lg:min-h-100">
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>

            {/* Text Content */}
            <div className="z-10 flex flex-col items-center text-center md:items-start md:text-left space-y-4 w-full md:w-1/2">
              <div className="space-y-1">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight">
                  15% OFF
                </h2>
                <p className="text-sm lg:text-lg font-bold text-gray-800 tracking-wide uppercase">
                  Get Mega Discount
                </p>
              </div>

              <button className="mt-4 px-8 lg:px-10 py-2 border-2 border-slate-900 text-slate-900 rounded-full font-bold text-lg hover:bg-slate-900 hover:text-white transition-all duration-300">
                Shop now
              </button>
            </div>

            <div className="relative mt-8 md:mt-0 w-full md:w-1/2 h-64 md:h-full min-h-[8vh]">
              <Image
                src="/items/chair.png"
                alt="Smartwatch Promotion"
                fill
                className="object-contain object-center md:object-right"
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-[#1a2d2e] dark:text-white">
              Summer Fashion
            </h2>

            <div className="flex gap-2">
              <button
                id="summer-fashion-prev"
                className="w-8 h-8 flex items-center justify-center bg-[#1a2d2e] text-white hover:bg-opacity-90 transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                id="summer-fashion-next"
                className="w-8 h-8 flex items-center justify-center bg-[#ff781f] text-white hover:bg-opacity-90 transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative grow">
            <Swiper
              modules={[Navigation]}
              spaceBetween={15}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation={{
                prevEl: "#summer-fashion-prev",
                nextEl: "#summer-fashion-next",
              }}
              className="pb-4 h-full"
            >
              {isNewArrivals.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <Card className="rounded-sm shadow-none group py-4 h-full flex flex-col">
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

                    <CardContent className="px-4 space-y-2 grow">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => {
                          const isFilled = i < Math.floor(product.rating);

                          return (
                            <Star
                              key={i}
                              size={14}
                              className={
                                isFilled
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-orange-400 opacity-40"
                              }
                            />
                          );
                        })}

                        <span className="ml-2 text-xs text-gray-500 font-medium">
                          {product.rating}
                        </span>
                      </div>

                      <h3 className="text-[15px] font-bold dark:text-white text-[#1a2d2e] leading-tight min-h-10 line-clamp-2">
                        {product.name}
                      </h3>

                      <h3 className="font-bold text-lg text-[#00a99d]">
                        ৳
                        {product.price % 1 === 0
                          ? product.price.toFixed(2)
                          : product.price}
                      </h3>
                    </CardContent>

                    <CardFooter className="flex justify-between gap-6 px-4 mt-auto">
                      <Button className="flex-1 bg-[#1a2d2e] hover:bg-[#2a3d3e] text-white rounded-sm text-xs gap-2 px-2 cursor-pointer">
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
