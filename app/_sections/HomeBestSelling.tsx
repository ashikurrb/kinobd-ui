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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: string;
  featuredProduct: boolean;
  newArrival: boolean;
  bestReview: boolean;
  bestSelling: boolean;
  name: string;
  img: string;
  price: number;
  rating: number;
  features: string[];
}

//custom component
const ProductSlider = ({ products }: { products: Product[] }) => (
  <Swiper
    modules={[Navigation]}
    spaceBetween={15}
    slidesPerView={1.2}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 6 },
    }}
    navigation={{
      prevEl: "#new-arrival-prev",
      nextEl: "#new-arrival-next",
    }}
    className="pb-4 h-full"
  >
    {products.map((product) => (
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
            <Button variant="outline" size="icon" className="cursor-pointer">
              <Heart size={20} className="text-gray-400" />
            </Button>
          </CardFooter>
        </Card>
      </SwiperSlide>
    ))}
  </Swiper>
);

//main component
export default function HomeBestSelling() {
  const [isBestSellingProducts, setIsBestSellingProducts] = useState<Product[]>(
    [],
  );
  const [isBestReview, setIsBestReview] = useState<Product[]>([]);

  const getBestProducts = async () => {
    try {
      const { data } = await axios.get<Product[]>("/product.json");
      const bestSelling = data.filter(
        (product) => product.bestSelling === true,
      );
      const bestReviews = data.filter((product) => product.bestReview === true);

      setIsBestSellingProducts(bestSelling);
      setIsBestReview(bestReviews);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    getBestProducts();
  }, []);

  return (
    <div className="lg:px-30 xl:px-60 px-5 pt-15 space-y-6 text-slate-900 dark:text-slate-100">
      <div className="flex flex-col h-full">
        <Tabs defaultValue="best-selling">
          <div className="flex justify-between items-end mb-6">
            <TabsList className="bg-transparent flex gap-2">
              <TabsTrigger
                value="best-selling"
                className="text-lg lg:text-2xl font-bold text-[#1a2d2e] dark:text-white lg:py-5 py-4 rounded-md
               data-[state=active]:bg-[#ff781f]  data-[state=active]:text-white
               dark:data-[state=active]:bg-[#ff781f]  dark:data-[state=active]:text-white"
              >
                Best Selling
              </TabsTrigger>
              <TabsTrigger
                value="best-review"
                className="text-lg lg:text-2xl font-bold text-[#1a2d2e] dark:text-white lg:py-5 py-4 rounded-md
               data-[state=active]:bg-[#ff781f] data-[state=active]:text-white
                dark:data-[state=active]:bg-[#ff781f]  dark:data-[state=active]:text-white"
              >
                Best Review
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <button
                id="best-selling-prev"
                className="w-8 h-8 flex items-center justify-center bg-[#1a2d2e] text-white hover:bg-opacity-90 transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                id="best-selling-next"
                className="w-8 h-8 flex items-center justify-center bg-[#ff781f] text-white hover:bg-opacity-90 transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative grow">
            <TabsContent value="best-selling" className="m-0">
              <ProductSlider products={isBestSellingProducts} />
            </TabsContent>
            <TabsContent value="best-review" className="m-0">
              <ProductSlider products={isBestReview} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
