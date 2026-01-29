"use client";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  featuredProduct: boolean;
  newArrival: boolean;
  name: string;
  img: string;
  price: number;
  discountedPrice: number;
  rating: number;
  features: string[];
}

export default function HomeSpecialPeak() {
  const [isFeaturedProducts, setIsFeaturedProducts] = useState<Product[]>([]);

  const getSpecialPeak = async () => {
    try {
      const { data } = await axios.get<Product[]>("/product.json");
      const featured: Product[] = data.filter(
        (product) => product.featuredProduct === true,
      );
      // Logic: Take slice 30-34 if available, otherwise 0-4
      setIsFeaturedProducts(
        featured.length >= 34 ? featured.slice(30, 34) : featured.slice(0, 4),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    getSpecialPeak();
  }, []);

  return (
    <div className="lg:px-30 xl:px-60 px-5 pt-15 space-y-6 text-slate-900 dark:text-slate-100">
      <h2 className="text-2xl font-bold text-[#1a2d2e] dark:text-white">
        Special Peak for You
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
          {isFeaturedProducts.map((product) => (
            <Card
              className="rounded-sm shadow-none group flex flex-col h-full"
              key={product.id}
            >
              <CardHeader>
                {product.discountedPrice < product.price && (
                  <Badge variant={"destructive"}>
                    {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="space-y-2 grow mt-0">
                <div className="relative aspect-square flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-bold dark:text-white text-[#1a2d2e] line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-orange-400 text-orange-400"
                          : "text-orange-400 opacity-40"
                      }
                    />
                  ))}
                  <span className="ml-2 text-gray-500 text-sm">
                    {product.rating}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex flex-wrap justify-between items-center gap-2">
                <h3 className="font-bold text-lg text-[#00a99d]">
                  ৳{product.price.toLocaleString()}
                </h3>
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <Button className="bg-[#1a2d2e] hover:bg-[#2a3d3e] text-white rounded-sm text-md gap-1 px-2 cursor-pointer">
                    <ShoppingCart size={14} />
                    Add
                  </Button>
                  <Button variant="outline" className="h-8 w-8 cursor-pointer">
                    <Heart size={16} className="text-gray-400" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="w-full h-full">
          <div className="relative w-full aspect-9/16 lg:aspect-auto lg:h-full min-h-100 rounded-sm overflow-hidden bg-black">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/eakycrn2ovg?si=XQAxCjvteKFOjxpy"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
