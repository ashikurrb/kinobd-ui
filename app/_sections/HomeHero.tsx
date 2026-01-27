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
} from "lucide-react";
import Countdown, { zeroPad } from "react-countdown";
import dayjs from "dayjs";

interface DealItem {
  name: string;
  img: string;
  price: string;
  rating: number;
  lastTime: string;
}

export default function HomeHero() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;
  const carouselItems = [
    { img: "/banner/homeBanner1.png", url: "#" },
    { img: "/banner/homeBanner2.png", url: "#" },
    { img: "/banner/homeBanner3.png", url: "#" },
  ];

  const dealsOfTheDay = [
    {
      name: "Rechargeable Wireless Mouse",
      img: "/banner/mouse.jpg",
      price: "120",
      rating: 4,
      lastTime: "2026-01-29T12:25:40.310+00:00",
    },
  ];

  return (
    <div className="lg:px-20 px-5 pt-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Carousel + Trust Cards */}
        <div className="lg:col-span-8 w-full">
          {/* Carousel */}
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full overflow-hidden rounded-sm"
          >
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="relative h-100 md:h-112.5">
                  <Image
                    src={item.img}
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Text Overlay - Adjusted for mobile centering/padding */}
                  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 space-y-3 md:space-y-4 bg-black/10 md:bg-transparent">
                    <p className="text-xs md:text-sm font-medium flex items-center gap-2">
                      <span className="w-4 h-4 md:w-5 md:h-5 bg-black rounded-full inline-block" />
                      Welcome to Kinobd
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
                      Design for way <br /> you live
                    </h1>
                    <p className="text-sm md:text-base text-slate-600">
                      Everythings in one place
                    </p>
                    <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                      <Button className="bg-orange-500 hover:bg-orange-600 rounded-full px-5 md:px-8 py-4 md:py-6 text-sm">
                        Shop New Arrival
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full px-5 md:px-8 py-4 md:py-6 border-slate-300 text-sm bg-white/80 md:bg-transparent"
                      >
                        Explore Collections
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Trust Cards - Stack on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
            <div className="flex flex-col bg-[url('/layer.png')] bg-cover bg-center border border-slate-100 rounded-sm">
              <div className="flex gap-4 md:gap-6 items-center justify-center px-6 md:px-12.5 pt-7">
                <Image
                  src="/lock.png"
                  alt="Secure Payment"
                  width={60}
                  height={60}
                  className="object-contain md:w-17.5 md:h-17.5"
                />
                <div>
                  <h3 className="text-base md:text-lg font-bold">
                    Secure Payment
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    Each and every payment is 100% secured
                  </p>
                </div>
              </div>
              <h3 className="text-red-600 text-xs md:text-sm cursor-pointer flex items-center gap-1 justify-end py-5 px-6 md:px-12">
                Learn More
                <SquareArrowOutUpRight size={14} />
              </h3>
            </div>

            <div className="flex flex-col bg-[url('/layer.png')] bg-cover bg-center border border-slate-100 rounded-sm">
              <div className="flex gap-4 md:gap-6 items-center justify-center px-6 md:px-12.5 pt-7">
                <Image
                  src="/originalseal.png"
                  alt="OG"
                  width={60}
                  height={60}
                  className="object-contain md:w-17.5 md:h-17.5"
                />
                <div>
                  <h3 className="text-base md:text-lg font-bold">
                    Original Products
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    100% authentic products guaranteed
                  </p>
                </div>
              </div>
              <h3 className="text-red-600 text-xs md:text-sm cursor-pointer flex items-center gap-1 justify-end py-5 px-6 md:px-12">
                Learn More
                <SquareArrowOutUpRight size={14} />
              </h3>
            </div>
          </div>
        </div>

        {/* Right Column: Deal of the Day */}
        <div
          className="lg:col-span-4 border border-teal-100
         dark:border-b-gray-800 rounded-lg p-6 flex flex-col items-center"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Deal of the Day
          </h2>
          {dealsOfTheDay.map((deal, idx) => (
            <React.Fragment key={idx}>
              <Countdown
                date={dayjs(deal.lastTime).toDate()}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (completed) {
                    return (
                      <div className="mb-8 text-red-500 font-bold text-xl py-2 italic">
                        Time&apos;s Up!
                      </div>
                    );
                  }
                  return (
                    <div className="flex gap-2 md:gap-3">
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
                          <span className="text-lg md:text-xl font-bold">
                            {zeroPad(t.v)}
                          </span>
                          <span className="text-[9px] md:text-[10px] uppercase">
                            {t.l}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }}
              />

              <div className="relative max-w-75 lg:max-w-full">
                <Image
                  src={deal.img}
                  alt={deal.name}
                  width={342}
                  height={342}
                  className="aspect-square px-15 object-contain"
                />
              </div>

              <div className="text-center w-full">
                <h3 className="text-slate-700 text-start font-bold">
                  {deal.name}
                </h3>
                <div className="flex justify-start text-orange-400 text-lg">
                  {"★".repeat(deal.rating)}
                  {"☆".repeat(5 - deal.rating)}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-teal-600 font-bold text-lg">
                    {deal.price}.00৳
                  </span>
                  <Button className="text-xs px-4 cursor-pointer">
                    <ShoppingCart /> Buy Now
                  </Button>
                </div>
                <div className="flex justify-end">
                  <button className="text-sm text-end flex items-center gap-2 mt-5">
                    View All <ArrowUpRightFromSquareIcon size={13} />
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
