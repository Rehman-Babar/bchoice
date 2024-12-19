import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Navbar1 = () => {
  const paragraphs = [
    "We Don’t Compromise on Quality",
    "Quality is Our Priority",
    "Exceeding Expectations, Always",
    "Delivering Excellence Every Time",
    "Quality You Can Trust"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % paragraphs.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? paragraphs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='md:px-10 py-5 flex justify-between items-center overflow-x-hidden'>
      <div className='text-lg hidden md:block'>Contact us: <span className='font-semibold'>03092610588</span></div>
      
      <div className='flex items-center justify-center mx-auto gap-3'>
        <button className='text-lg font-bold' onClick={handleBack}>
          <IoIosArrowBack />
        </button>
        <p className='whitespace-nowrap'>{paragraphs[currentIndex]}</p>
        <button className='text-lg font-bold' onClick={handleNext}>
          <IoIosArrowForward />
        </button>
      </div>
      
      <div className="hidden  md:flex items-center space-x-4 flex-shrink-0">
        <div className="flex items-center justify-center w-7 h-7 rotate-45 rounded-lg bg-blue-600 text-white">
          <FaFacebook className='-rotate-45' />
        </div>
        <div className="flex items-center justify-center w-7 h-7 rounded-lg rotate-45 bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 text-white">
          <FaInstagram className='-rotate-45'/>
        </div>
        <div className="flex items-center justify-center w-7 h-7 rounded-lg rotate-45 bg-black text-white">
          <FaTiktok className='-rotate-45'/>
        </div>
        <div className="flex items-center justify-center w-7 h-7 rounded-lg rotate-45 bg-red-600 text-white">
          <FaYoutube className='-rotate-45'/>
        </div>
        <div className="flex items-center justify-center w-7 h-7 rounded-lg rotate-45 bg-green-500 text-white">
          <FaWhatsapp className='-rotate-45'/>
        </div>
      </div>
    </div>
  );
}

export default Navbar1;
