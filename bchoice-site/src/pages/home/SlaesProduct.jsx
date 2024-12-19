import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SlaesProduct = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesPerView(3);
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
      <Swiper
       
        loop={true}
        spaceBetween={40} // Adjust spacing as needed
        slidesPerView={slidesPerView} // Dynamically set slidesPerView
        autoplay={{ delay: 3000 }}
        className="p-2  mt-6 md:mt-20 mx-auto max-w-[1400px] ">
        <SwiperSlide>
          <div className="relative">
            <img src="/product-banner/4.jpg" alt="" className="rounded-md w-full" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center items-start bg-black/50 bg-opacity-40 rounded-md">
              <h2 className="font-semibold text-[10px] sm:text-3xl text-red-600">Children</h2>
              <h2 className="font-semibold text-sm sm:text-3xl text-white sm:pb-2">Latest Fashion</h2>
              <div className="flex flex-col items-start text-white">
                <span className="text-red-500 font-extrabold sm:pb-2 text-xs sm:text-lg">
                  15% <code className="text-[#4a4848]">off on first order</code>
                </span>
                <button className="px-3 py-1 sm:px-4 sm:py-2  bg-red-500 rounded-md text-white font-bold mt-2">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src="/product-banner/5.jpg" alt="" className="rounded-md w-full" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center items-start bg-black/50 bg-opacity-40 rounded-md">
              <h2 className="font-semibold text-[10px] sm:text-3xl text-red-600">Children</h2>
              <h2 className="font-semibold text-sm sm:text-3xl text-white sm:pb-2">Latest Fashion</h2>
              <div className="flex flex-col items-start text-white">
                <span className="text-red-500 font-extrabold sm:pb-2 text-xs sm:text-lg">
                  15% <code className="text-[#4a4848]">off on first order</code>
                </span>
                <button className="px-3 py-1 sm:px-4 sm:py-2  bg-red-500 rounded-md text-white font-bold mt-2">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src="/product-banner/6.jpg" alt="" className="rounded-md w-full" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center items-start bg-black/50 bg-opacity-40 rounded-md">
              <h2 className="font-semibold text-[10px] sm:text-3xl text-red-600">Children</h2>
              <h2 className="font-semibold text-sm sm:text-3xl text-white sm:pb-2">Latest Fashion</h2>
              <div className="flex flex-col items-start text-white">
                <span className="text-red-500 font-extrabold sm:pb-2 text-xs sm:text-lg">
                  15% <code className="text-[#4a4848]">off on first order</code>
                </span>
                <button className="px-3 py-1 sm:px-4 sm:py-2  bg-red-500 rounded-md text-white font-bold mt-2">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src="/product-banner/4.jpg" alt="" className="rounded-md w-full" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center items-start bg-black/50 bg-opacity-40 rounded-md">
              <h2 className="font-semibold text-[10px] sm:text-3xl text-red-600">Children</h2>
              <h2 className="font-semibold text-sm sm:text-3xl text-white sm:pb-2">Latest Fashion</h2>
              <div className="flex flex-col items-start text-white">
                <span className="text-red-500 font-extrabold sm:pb-2 text-xs">
                  15% <code className="text-[#4a4848]">off on first order</code>
                </span>
                <button id="allproducts" className="px-3 py-1 sm:px-4 sm:py-2  bg-red-500 rounded-md text-white font-bold mt-2">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* <SwiperSlide>
          <div className="relative">
            <img src="/product-banner/5.jpg" alt="" className="rounded-md w-full" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center items-start bg-black bg-opacity-40 rounded-md">
              <h2 className="font-semibold text-2xl sm:text-3xl text-white">Children</h2>
              <h2 className="font-semibold text-2xl sm:text-3xl text-white pb-2">Latest Fashion</h2>
              <div className="flex flex-col items-start text-white">
                <span className="text-red-500 font-extrabold pb-2">
                  15% <code className="text-[#4a4848]">off on first order</code>
                </span>
                <button className="px-4 py-2 bg-red-500 rounded-md text-white font-bold mt-2">Shop Now</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src="/product-banner/6.jpg" alt="" className="rounded-md w-full" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center items-start bg-black bg-opacity-40 rounded-md">
              <h2 className="font-semibold text-2xl sm:text-3xl text-white">Children</h2>
              <h2 className="font-semibold text-2xl sm:text-3xl text-white pb-2">Latest Fashion</h2>
              <div className="flex flex-col items-start text-white">
                <span className="text-red-500 font-extrabold pb-2">
                  15% <code className="text-[#4a4848]">off on first order</code>
                </span>
                <button className="px-4 py-2 bg-red-500 rounded-md text-white font-bold mt-2">Shop Now</button>
              </div>
            </div>
          </div>
        </SwiperSlide> */}

        {/* Add more SwiperSlides as needed */}
      </Swiper>
    </>
  );
};

export default SlaesProduct;
