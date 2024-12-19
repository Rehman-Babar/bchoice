import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

import { GoArrowRight } from "react-icons/go";

const LatestNews = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesPerView(4);
      } else if (width >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="mt-12">
        <h1 className="text-center text-5xl font-bold">Latest News</h1>
        <p className="text-center mt-2 font-semibold text-[#6f6e6e]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />
          incididunt ut labore lacus vel facilisis.
        </p>
      </div>
      {/* slider */}
      <div className="mt-5 px-16 md:px-28">
        <Swiper
          loop={true}
          spaceBetween={20} // Adjust spacing as needed
          slidesPerView={slidesPerView} // Dynamically set slidesPerView
          autoplay={{ delay: 3000 }}
          className="p-2 sm:mx-auto max-w-[1400px] pb-12">
          <SwiperSlide>
            <div>
              <div className="overflow-hidden relative">
                <div className="absolute flex flex-col bg-black/60 ml-4 mt-2 px-3 py-1 rounded-md">
                  <span className="font-bold text-white">10</span>
                  <span className="font-bold text-white">Oct</span>
                </div>
                <img
                  src="/blog/4.jpg"
                  alt=""
                  className="rounded-t-md hover:rotate-6 hover:scale-125 transition-all duration-1000 cursor-pointer"
                />
              </div>
              <div className="pl-2 py-2 border">
                <div className="space-x-2">
                  <Link className="font-semibold text-[#ACACAC] hover:text-red-400">ByAdmin</Link> |
                  <Link className="font-semibold text-[#ACACAC] hover:text-red-400">Fation</Link>
                </div>
                <p className="font-bold">The ultimate online shopping experience. Quality, convenience</p>
                <div className="flex items-center gap-2">
                  <button className=" py-2 text-red-500 rounded-md font-bold mt-2">Read More</button>
                  <GoArrowRight className="mt-3 text-red-500 size-5" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div>
              <div className="overflow-hidden relative">
                <div className="absolute flex flex-col bg-black/60 ml-4 mt-2 px-3 py-1 rounded-md">
                  <span className="font-bold text-white">15</span>
                  <span className="font-bold text-white">Feb</span>
                </div>
                <img
                  src="/blog/5.jpg"
                  alt=""
                  className="rounded-t-md hover:rotate-6 hover:scale-125 transition-all duration-1000 cursor-pointer"
                />
              </div>
              <div className="pl-2 py-2 border">
                <div className="space-x-2">
                  <Link className="font-semibold text-[#ACACAC] hover:text-red-400">ByAdmin</Link> |
                  <Link className="font-semibold text-[#ACACAC] hover:text-red-400">Fation</Link>
                </div>
                <p className="font-bold">The ultimate online shopping experience. Quality, convenience</p>
                <div className="flex items-center gap-2">
                  <button className=" py-2 text-red-500 rounded-md font-bold mt-2">Read More</button>
                  <GoArrowRight className="mt-3 text-red-500 size-5" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <div className="relative overflow-hidden">
                <div className="absolute flex flex-col bg-black/60 ml-4 mt-2 px-3 py-1 rounded-md">
                  <span className="font-bold text-white">5</span>
                  <span className="font-bold text-white">Jen</span>
                </div>
                <img
                  src="/blog/6.jpg"
                  alt=""
                  className="rounded-t-md hover:rotate-6 hover:scale-125 transition-all duration-1000 cursor-pointer"
                />
              </div>
              <div className="pl-2 py-2 border">
                <div className="space-x-2">
                  <Link className="font-semibold text-[#ACACAC] hover:text-red-400">ByAdmin</Link> |
                  <Link className="font-semibold text-[#ACACAC] hover:text-red-400">Fation</Link>
                </div>
                <p className="font-bold">The ultimate online shopping experience. Quality, convenience</p>
                <div className="flex items-center gap-2">
                  <button className=" py-2 text-red-500 rounded-md font-bold mt-2">Read More</button>
                  <GoArrowRight className="mt-3 text-red-500 size-5" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <div className="relative overflow-hidden">
                <div className="absolute flex flex-col bg-black/60 ml-4 mt-2 px-3 py-1 rounded-md">
                  <span className="font-bold text-white">22</span>
                  <span className="font-bold text-white">Sep</span>
                </div>
                <img
                  src="/blog/7.jpg"
                  alt=""
                  className="rounded-t-md hover:rotate-6 hover:scale-125 transition-all duration-1000 cursor-pointer"
                />
              </div>
              <div className="pl-2 py-2 border">
                <div className="space-x-2">
                  <Link className="font-semibold text-[#ACACAC] hover:text-red-400">ByAdmin</Link> |
                  <Link className="font-semibold text-[#ACACAC] hover:text-red-400">Fation</Link>
                </div>
                <p className="font-bold">The ultimate online shopping experience. Quality, convenience</p>
                <div className="flex items-center gap-2">
                  <button className=" py-2 text-red-500 rounded-md font-bold mt-2">Read More</button>
                  <GoArrowRight className="mt-3 text-red-500 size-5" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Add more SwiperSlides as needed */}
        </Swiper>
      </div>
    </>
  );
};

export default LatestNews;
