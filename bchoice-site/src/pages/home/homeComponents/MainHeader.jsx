import React, { useState } from "react";
import { Link } from "react-router-dom";
// import circle from "./assets/circle.png";
// import girl from "./assets/girl.png";
// import offer from "./assets/offer.png";
// import gifts from "./assets/gifts.png";

function NewHomePage() {
  const [showModal, setShowModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const openModal = () => {
    setVideoSrc("https://www.youtube.com/embed/tQ9d-6Rm1n0?autoplay=1&rel=0&si=KGy_Om5Y9lIfNcK3");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoSrc(""); 
  };


  return (
    <div className="p-4 overflow-x-hidden overflow-y-hidden">
    <div className="flex flex-wrap xl:flex-row flex-col  justify-between  gap-4 h-[27vh] sm:h-[50vh] md:h-[85vh] xl:h-[68vh]">
      {/* Left Section */}
      <div className="flex-1 bg-black text-white relative justify-center rounded-sm flex items-center overflow-hidden overflow-y-hidden">
      <div className="absolute xl:left-16 xl:top-[13rem]  lg:top-[10rem] 2xl:left-36  lg:left-12 md:left-7 left-4 flex flex-col items-center space-y-4 xl:space-y-8 z-10">
          <h1 className="lg:text-5xl md:text-3xl text-lg font-bold xl:mb-4">Shop With Style!</h1>
          <button 
          
          className="bg-white text-black md:px-6 px-4 py-2 rounded-sm text-xs md:font-semibold">View Collection</button>
        </div>
        {/* Background Circle */}
        <img src="/homePage/7.png" alt="Background Circle" className="absolute md:-left-28 -left-24 xl:top-80 md:top-60 sm:top-40 top-24 md:-rotate-45 -rotate-[18deg]  xl:-rotate-45 xl:w-1/2 w-[30vh] md:w-[70vh] object-cover" />
        
        {/* Girl Image */}
        <img src="/homePage/4.png"  alt="Girl Shopping" className="z-10 xl:max-h-[34rem] md:max-h-[30rem] sm:max-h-[18rem] max-h-[13rem] mt-10  md:mt-4   md:ml-[32rem] sm:ml-64 ml-48" />

        <img src="/homePage/7.png" alt="Background Circle" className="absolute xl:-right-56 md:-right-64 -right-36 xl:-top-28 md:-top-44 -top-28 -rotate-[250deg] md:-rotate-[200deg] xl:-rotate-[210deg] w-[40vh] md:w-[100vh] lg:w-[110vh] xl:w-[70%] object-cover" />
        
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-4 w-1/3 relative overflow-y-hidden overflow-hidden">
        {/* Offer Section */}
        <div className=" bg-red-500 hidden xl:flex text-white p-4 rounded-sm overflow-y-hidden overflow-hidden">
          <img src="/homePage/5.png"  alt="Special Offer" className="w-1/2  h-full object-cover" />
          <img  src="/homePage/6.png"  alt="Background Circle" className="w-1/2 right-0 absolute h-auto" />
        </div>
        <div className="relative hidden xl:flex overscroll-none bg-[#ff5757] text-black p-8 pb-4 h-auto  rounded-sm   justify-between items-center">
            <div className="h-[14.5rem] flex flex-col items-center justify-center">
            <h2 className="text-4xl text-white font-bold mb-2">Make Custom Gift</h2>
            <button 
            onClick={openModal}
            className="bg-black text-white text-start flex-shrink-0 items-start  px-12 py-2 rounded-sm font-semibold">Make</button>
            </div>
          <img src="/homePage/popup.png" alt="Gifts" className="size-44 mb-4 " />
          
        </div>
        {/* Custom Gift Section */}
       
      </div>
    </div>

    <div className="flex -mt-2">
    <div className="relative flex xl:hidden overscroll-none bg-[#ff5757] text-black p-4 rounded-sm w-full justify-between  items-center">
            <div className="">
            <h2 className="text-2xl md:text-4xl text-white font-bold mb-2">Make Custom Gift</h2>
            <button
            onClick={openModal}
             className="bg-black text-white text-center mt-6 flex-shrink-0 md:px-12 md:py-2 px-8 py-0 rounded-sm font-semibold">Make</button>
            </div>
          <img src="/homePage/popup.png" alt="Gifts" className="md:size-20 size-28 rounded-sm  mb-4 " />
          
        </div>
        <div className=" bg-[#ff5757] hidden md:flex xl:hidden text-white p-4 rounded-sm">
          <img src="/homePage/5.png"  alt="Special Offer" className="w-1/2  h-full object-cover" />
          <img  src="/homePage/6.png"  alt="Background Circle" className="w-52 right-0 absolute h-auto" />
        </div>
    </div>
    {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-sm max-w-2xl w-full mx-4 py-3 md:p-6">
            <div className="relative bg-[#F5F3F3] rounded-md py-4 px-4">
              {/* Modal content */}
              <div className="flex justify-center">
                <div className="relative w-full pt-[56.25%] mb-4"> {/* 16:9 Aspect Ratio */}
                  <iframe
                    src={videoSrc} // Use the videoSrc state for the src
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border border-gray-300 " // Border and rounded corners
                  ></iframe>
                </div>
              </div>

              <h2 className="text-lg md:text-2xl font-bold text-center mt-4">
                Here You can make Custom Gift for Your Favourite Ones
              </h2>

              {/* Button */}
              <div className="flex justify-center mb-4">
                <Link
                  to={"/boxes/custom-gift"}
                  className="mt-6 text-center py-2 px-6 text-white bg-red-700 rounded-sm">
                  Continue
                </Link>
              </div>

              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 bg-gray-100 p-1 rounded-full">
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewHomePage;
