/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import FeedbackModal from "./homeComponents/ReviewModal";

const Reviews = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Section Title */}
      <div className="px-3 p-2 rounded-full border-2 flex justify-center items-center w-44 mx-auto text-[#FF1402] border-[#FF1402] mt-4 mb-4">
        Customer Reviews
      </div>
      <div className="text-center text-4xl font-bold tracking-wider">Our Clients Reviews</div>
      <p className="max-w-[35rem] text-center mx-auto mt-4">
        Hear from our satisfied clients - real success stories, genuine endorsements, and the proof of our excellence.
      </p>

      {/* Slider */}
      <Slider {...settings} className="px-4 sm:px-8 md:px-12 lg:px-24 my-14">
        {/* Review 1 */}
        <div className="p-4 bg-[#FAFAFA] rounded-xl shadow-sm transition-shadow flex flex-col sm:flex-row">
          <div className="flex">
            <div className="pl-0 sm:pl-10 shrink-0 flex flex-col items-center">
              <img src="/user.jpeg" alt="user" className="w-20 h-20 rounded-full mb-3" />
              <h4 className="text-md font-semibold text-gray-900">User Name</h4>
              <p className="text-sm text-gray-600 mt-3">October 12, 2021</p>
              <p className="text-sm text-gray-600">10:30 AM</p>
            </div>
            <div className="ml-0 sm:ml-10 mt-4">
              <div className="flex items-center text-[#F5A623]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-sm text-gray-900 mt-4">
                This is an amazing phone, I love it. It's so fast and has a good battery life. I would recommend it to
                anyone.
              </p>
            </div>
          </div>
        </div>

        {/* Review 2 */}
        <div className="p-4 bg-[#FAFAFA] rounded-xl shadow-sm transition-shadow flex flex-col sm:flex-row">
          <div className="flex">
            <div className="pl-0 sm:pl-10 shrink-0 flex flex-col items-center">
              <img src="/user.jpeg" alt="user" className="w-20 h-20 rounded-full mb-3" />
              <h4 className="text-md font-semibold text-gray-900">User Name</h4>
              <p className="text-sm text-gray-600 mt-3">October 12, 2021</p>
              <p className="text-sm text-gray-600">10:30 AM</p>
            </div>
            <div className="ml-0 sm:ml-10 mt-4">
              <div className="flex items-center text-[#F5A623]">
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-sm text-gray-900 mt-4">
                This is an amazing phone, I love it. It's so fast and has a good life.
              </p>
            </div>
          </div>
        </div>

        {/* Review 3 */}
        <div className="p-4 bg-[#FAFAFA] rounded-xl shadow-sm transition-shadow flex flex-col sm:flex-row">
          <div className="flex">
            <div className="pl-0 sm:pl-10 shrink-0 flex flex-col items-center">
              <img src="/user.jpeg" alt="user" className="w-20 h-20 rounded-full mb-3" />
              <h4 className="text-md font-semibold text-gray-900">User Name</h4>
              <p className="text-sm text-gray-600 mt-3">October 12, 2021</p>
              <p className="text-sm text-gray-600">10:30 AM</p>
            </div>
            <div className="ml-0 sm:ml-10 mt-4">
              <div className="flex items-center text-[#F5A623]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-sm text-gray-900 mt-4">
                This is an amazing phone, I love it. It's so fast and has a good battery life. I would recommend it to
                anyone.
              </p>
            </div>
          </div>
        </div>
      </Slider>
      {/* three buttons in row with border */}
      <div className="flex justify-center flex-col md:flex-row mt-12 px-3 md:px-28 gap-4 mb-10">
        <Link to={"/reviews"} className="text-[#FF1402] border border-[#FF1402] w-full py-2 text-center">
          See All Reviews
        </Link>
        <div
          className="text-[#FF1402] border border-[#FF1402] w-full py-2 text-center cursor-pointer"
          onClick={() => setModalOpen(true)}>
          Write Reviews
        </div>
        <FeedbackModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        <a
          href="https://www.youtube.com/playlist?list=PLNjwG6uUEU3LGK0rnNbH7WFTshRfhWRe8"
          className="text-[#FF1402] border border-[#FF1402] w-full py-2 text-center">
          Video Reviews
        </a>
      </div>
    </>
  );
};

export default Reviews;
