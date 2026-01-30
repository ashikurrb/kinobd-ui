"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function HomeFeedBack() {
  const feedBack = [
    {
      id: 1,
      name: "Barta Bahok",
      designation: "Product Designer at Google",
      rating: 5,
      youtubeUrl: "eakycrn2ovg?si=XQAxCjvteKFOjxpy",
    },
    {
      id: 2,
      name: "Barta Bahok",
      designation: "Product Designer at Google",
      rating: 5,
      youtubeUrl: "eakycrn2ovg?si=XQAxCjvteKFOjxpy",
    },
    {
      id: 3,
      name: "Barta Bahok",
      designation: "Product Designer at Google",
      rating: 5,
      youtubeUrl: "eakycrn2ovg?si=XQAxCjvteKFOjxpy",
    },
    {
      id: 4,
      name: "Barta Bahok",
      designation: "Product Designer at Google",
      rating: 5,
      youtubeUrl: "eakycrn2ovg?si=XQAxCjvteKFOjxpy",
    },
  ];

  return (
    <div className="lg:pt-25 pt-15 text-slate-900 dark:text-slate-100">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-[#1a2d2e] dark:text-white">
          Positive Feedback from Customers
        </h2>

        <div className="flex gap-2">
          <button
            id="feedback-prev-btn"
            className="w-8 h-8 flex items-center justify-center bg-[#1a2d2e] text-white hover:bg-opacity-90 transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            id="feedback-next-btn"
            className="w-8 h-8 flex items-center justify-center bg-[#ff781f] text-white hover:bg-opacity-90 transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          prevEl: "#feedback-prev-btn",
          nextEl: "#feedback-next-btn",
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {feedBack.map((item) => (
          <SwiperSlide
            key={item.id}
            className="relative w-full aspect-9/16 rounded-sm overflow-hidden bg-black"
          >
            {/* Video */}
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeUrl}`}
              title={item.name}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Overlay */}
            <div className="absolute inset-x-0 bottom-4 px-4 text-center">
              <div className="rounded-xl p-3 text-white">
                <h4 className="font-semibold leading-tight">{item.name}</h4>
                <p className="text-xs text-white/80">{item.designation}</p>

                {/* Rating */}
                <div className="flex mt-1 text-center justify-center gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
