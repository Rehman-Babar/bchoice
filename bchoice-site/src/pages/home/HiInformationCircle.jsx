import React from "react";
import Slider from "react-slick";
import { TbTruckDelivery } from "react-icons/tb";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { FaBoxesPacking } from "react-icons/fa6";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { MdGppGood } from "react-icons/md";

const CustomCarousel = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto my-8 relative ">
      <Slider {...settings} className="">
        <div className="px-2">
          <div className="bg-[#F7F7F8] h-48 md:h-52 rounded-lg pt-4 pb-5 md:px-2  shadow-lg text-center border-2">
            {/* <img src="https://via.placeholder.com/150" alt="Slide 1" /> */}
            <MdGppGood className="size-16 text-[#F3473A] mx-auto" />
            <h2 className="mt-3 font-semibold text-sm lg:text-lg mb-2 sm:mb-0">12 Month Free Warranty</h2>
            <p className="text-gray-600 mt-1 text-xs lg:text-lg ">Only for brand new mobiles phones.</p>
          </div>
        </div>
        <div className="md:px-2">
          <div className="bg-[#F7F7F8] h-48 md:h-52 pt-4 pb-5 md:px-2  rounded-lg shadow-lg text-center border-2">
            {/* <img src="https://via.placeholder.com/150" alt="Slide 1" /> */}
            <FaAward className="size-16 text-[#F3473A] mx-auto" />
            <h2 className="mt-3 font-semibold text-sm lg:text-lg">Best Price Guarantee</h2>
            <p className="text-gray-600 mt-1 text-sm lg:text-lg">Some of the lowest price that {"you'lll"} find.</p>
          </div>
        </div>
        <div className="md:px-2">
          <div className="bg-[#F7F7F8] h-48 md:h-52 pt-4 pb-5 md:px-2  rounded-lg shadow-lg text-center border-2">
            {/* <img src="https://via.placeholder.com/150" alt="Slide 2" /> */}
            <FaCalendarDays className="size-16 text-[#F3473A]  mx-auto" />
            <h2 className="mt-3 font-semibold text-sm lg:text-lg">14 Day Check Warranty</h2>
            <p className="text-gray-600 mt-1 text-sm lg:text-lg">Peace of mind & money back guarantee.</p>
          </div>
        </div>
        <div className="md:px-2">
          <div className="bg-[#F7F7F8] h-48 md:h-52 pt-4 pb-5 md:px-2  rounded-lg shadow-lg text-center border-2">
            {/* <img src="https://via.placeholder.com/150" alt="Slide 3" /> */}
            <FaBoxesPacking className="size-16 text-[#F3473A]  mx-auto" />
            <h2 className="mt-3 font-semibold text-sm lg:text-lg">Free Express Shipping</h2>
            <p className="text-gray-600 mt-1 text-sm lg:text-lg">Country wide free express shiping.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default CustomCarousel;
