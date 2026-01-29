"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightFromSquareIcon,
  ShoppingCart,
  SquareArrowOutUpRight,
  Star,
} from "lucide-react";
import Countdown, { zeroPad } from "react-countdown";
import dayjs from "dayjs";
import { toast } from "sonner";
import axios from "axios";

export default function HomeHero() {
  const [isDealsOfTheDay, setIsDealsOfTheDay] = useState<any[]>([]);

  const carouselItems = [
    { img: "/banner/homeBanner1.png", url: "#" },
    { img: "/banner/homeBanner2.png", url: "#" },
    { img: "/banner/homeBanner3.png", url: "#" },
  ];

  //fetch deal of the day
  const getDealOfTheDay = async () => {
    try {
      const { data } = await axios.get("/product.json");
      const deals = data.filter(
        (product: any) => product.dealsOfTheDay === true,
      );
      setIsDealsOfTheDay(deals[0] ? [deals[0]] : []);
    } catch (error: any) {
      toast.error("Failed to fetch Deal of the Day.");
    }
  };

  //initialize
  useEffect(() => {
    getDealOfTheDay();
  }, []);

  return (
    <div className="pt-6 space-y-6 text-slate-900 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 w-full flex flex-col gap-6">
          <Carousel
            plugins={[Autoplay({ delay: 4000 })]}
            className="w-full overflow-hidden rounded-sm border dark:border-slate-800"
          >
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="relative h-80 md:h-100 lg:h-112.5"
                >
                  <Image
                    src={item.img}
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 space-y-3 md:space-y-4 bg-black/5 dark:bg-black/40">
                    <p className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-800 dark:text-orange-400">
                      <Image
                        src="/icon.svg"
                        alt="Kinobd Logo"
                        width={20}
                        height={20}
                        className="inline-block"
                      />
                      Welcome to Kinobd
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white leading-tight">
                      Design for way <br /> you live
                    </h1>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                      Everythings in one place
                    </p>
                    <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white 
                      rounded-full px-5 md:px-8 py-4 md:py-6 cursor-pointer"
                      >
                        Shop New Arrival
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full px-5 md:px-8 py-4 md:py-6 border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 dark:text-white cursor-pointer"
                      >
                        Explore Collections
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                title: "Secure Payment",
                desc: "Each and every payment is 100% secured",
                img: "/lock.png",
              },
              {
                title: "Original Products",
                desc: "100% authentic products guaranteed",
                img: "/originalseal.png",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col bg-[url('/layer.png')] dark:bg-none bg-slate-50 dark:bg-[#171717] bg-cover bg-center border border-slate-100 dark:border-slate-800 rounded-sm overflow-hidden transition-colors"
              >
                <div className="flex gap-4 md:gap-6 items-center justify-center px-6 py-8">
                  <Image
                    src={card.img}
                    alt="Icon"
                    width={60}
                    height={60}
                    className="object-contain md:w-16 md:h-16 dark:brightness-200 dark:contrast-100"
                  />
                  <div>
                    <h3 className="text-base md:text-lg font-bold dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <h3 className="text-red-600 dark:text-red-400 text-xs md:text-sm font-medium cursor-pointer flex items-center gap-1 justify-end pb-4 px-6 hover:underline">
                  Learn More <SquareArrowOutUpRight size={14} />
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/*  Deal of the Day  */}
        <div className="lg:col-span-4 border border-teal-100 dark:border-slate-800 bg-white dark:bg-[#171717] rounded-lg p-6 flex flex-col items-center shadow-sm h-full">
          <h2 className="text-xl md:text-2xl font-bold mb-6 dark:text-white">
            Deal of the Day
          </h2>
          {isDealsOfTheDay.map((deal, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-between h-full w-full"
            >
              <Countdown
                date={dayjs(deal.lastTime).toDate()}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <div className="flex gap-2 md:gap-3 mb-6">
                    {[
                      { v: days, l: "Day" },
                      { v: hours, l: "Hour" },
                      { v: minutes, l: "Min" },
                      { v: seconds, l: "Sec" },
                    ].map((t, i) => (
                      <div
                        key={i}
                        className="bg-orange-500 text-white w-12 h-14 flex flex-col items-center justify-center rounded-md"
                      >
                        <span className="text-lg font-bold">
                          {zeroPad(t.v)}
                        </span>
                        <span className="text-[9px] uppercase">{t.l}</span>
                      </div>
                    ))}
                  </div>
                )}
              />

              <div className="relative w-full max-w-55 mb-4 group">
                <Image
                  src={deal.img}
                  alt={deal.name}
                  width={342}
                  height={342}
                  className="aspect-square object-contain transition-transform group-hover:scale-105"
                />
              </div>

              <div className="w-full space-y-4">
                <div className="space-y-1">
                  <h3 className="text-slate-700 dark:text-slate-200 font-bold text-sm md:text-base leading-tight">
                    {deal.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-5">
                    {[...Array(5)].map((_, i) => {
                      const isFilled = i < Math.floor(deal.rating);

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
                      {deal.rating}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-teal-600 dark:text-teal-400 font-bold text-xl">
                    ৳{deal.price % 1 === 0 ? deal.price.toFixed(2) : deal.price}
                  </span>
                  <Button className="bg-slate-900 dark:bg-orange-500 hover:bg-slate-800 dark:hover:bg-orange-600 text-white text-xs h-9 px-4 font-bold cursor-pointer">
                    <ShoppingCart size={14} /> Buy Now
                  </Button>
                </div>

                <div className="pt-4 dark:border-slate-800 flex justify-end">
                  <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-orange-500 flex items-center gap-2">
                    View All <ArrowUpRightFromSquareIcon size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
