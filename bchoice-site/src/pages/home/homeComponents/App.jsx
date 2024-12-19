import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./carousel.css";

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [videoSrc, setVideoSrc] = useState(""); // Video source state

  useEffect(() => {
    let slideInterval;
    if (isPlaying) {
      slideInterval = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % 3); // Manually define the number of slides (3 here)
      }, 3000);
    }
    return () => clearInterval(slideInterval);
  }, [isPlaying]);

  const openModal = () => {
    setVideoSrc("https://www.youtube.com/embed/tQ9d-6Rm1n0?autoplay=1&rel=0&si=KGy_Om5Y9lIfNcK3"); // Set video source on modal open
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoSrc(""); // Clear the video source when closing the modal
  };

  return (
    <div className="carousel h-auto">
      {/* Slide 1 */}
      <div
        className={`relative flex md:flex-row justify-between items-center ${
          activeSlide === 1 ? "active" : ""
        }`}
        style={{
          background: "linear-gradient(to right, black, whitesmoke, orange)", // Add gradient background
          backgroundSize: "cover", // Ensures the background covers the whole area
          backgroundRepeat: "no-repeat", // Prevents the background from repeating
          backgroundPosition: "center", // Centers the background
        }}
      >
        <div className="w-[100%] md:w-1/3">
          <img src="/carousal/img1.png" alt="First slide" className="w-[100%] mt-16 md:mt-0 md:w-full" />
        </div>
        <div className="flex flex-col mt-9 items-center w-full md:w-1/3 text-center mb-10">
          <h1
            className="text-xl sm:text-4xl md:text-3xl lg:text-6xl font-bold text-center md:tracking-widest"
            style={{
              WebkitTextStroke: "2px black", // Border color and thickness
              color: "transparent", // Makes the main text color transparent
            }}
          >
            MAKE YOUR CUSTOM GIFT
          </h1>
          {/* <button
  id="new-arrival"
  onClick={openModal}
  className="px-6 py-3 bg-white md:mt-8 font-bold mt-4 text-black rounded-sm relative animate-shake-blur"
>
  Buy Now
</button> */}

<button
  style={{
    WebkitBoxReflect:
      'below 0px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4))',
  }}
  className="px-8 py-2 md:px-12 md:py-3 md:mt-8 mt-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-xl group-hover:shadow-2xl group-hover:shadow-red-600 shadow-red-600 uppercase font-serif tracking-widest relative overflow-hidden group text-transparent cursor-pointer z-10 after:absolute after:rounded-full after:bg-red-200 after:h-[85%] after:w-[95%] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 hover:saturate-[1.15] active:saturate-[1.4]"
  onClick={openModal}
  id="new arrival"
>
  Button
  <p className="absolute z-40 font-semibold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-full h-full w-full transition-all duration-300 -translate-y-[30%] tracking-widest text-xs sm:text-sm md:text-base">
    Buy Now
  </p>
  <p className="absolute z-40 top-1/2 left-1/2 bg-gradient-to-r from-red-700 to-orange-700 bg-clip-text text-transparent -translate-x-1/2 translate-y-full h-full w-full transition-all duration-300 group-hover:-translate-y-[40%] tracking-widest font-extrabold text-xs sm:text-sm md:text-base">
    Custom Gifts
  </p>
  <svg
    className="absolute w-full h-full scale-x-125 rotate-180 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group-hover:animate-none animate-pulse group-hover:-translate-y-[45%] transition-all duration-300"
    viewBox="0 0 2400 800"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sssurf-grad" y2="100%" x2="50%" y1="0%" x1="50%">
        <stop offset="0%" stopOpacity={1} stopColor="hsl(37, 99%, 67%)" />
        <stop offset="100%" stopOpacity={1} stopColor="hsl(316, 73%, 52%)" />
      </linearGradient>
    </defs>
    <g transform="matrix(1,0,0,1,0,-91.0877685546875)" fill="url(#sssurf-grad)">
      <path
        opacity="0.05"
        transform="matrix(1,0,0,1,0,35)"
        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
      />
      <path
        opacity="0.21"
        transform="matrix(1,0,0,1,0,70)"
        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
      />
      <path
        opacity="0.37"
        transform="matrix(1,0,0,1,0,105)"
        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
      />
      <path
        opacity="0.53"
        transform="matrix(1,0,0,1,0,140)"
        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
      />
      <path
        opacity="0.68"
        transform="matrix(1,0,0,1,0,175)"
        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
      />
      <path
        opacity="0.84"
        transform="matrix(1,0,0,1,0,210)"
        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
      />
      <path
        opacity={1}
        transform="matrix(1,0,0,1,0,245)"
        d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z"
      />
    </g>
  </svg>
  <svg
    className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] group-hover:-translate-y-[33%] group-hover:scale-95 transition-all duration-500 z-40 fill-red-500"
    viewBox="0 0 1440 320"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0,288L9.2,250.7C18.5,213,37,139,55,133.3C73.8,128,92,192,111,224C129.2,256,148,256,166,256C184.6,256,203,256,222,250.7C240,245,258,235,277,213.3C295.4,192,314,160,332,170.7C350.8,181,369,235,388,229.3C406.2,224,425,160,443,122.7C461.5,85,480,75,498,74.7C516.9,74,535,82,554,96.7C572.3,111,591,139,609,154.7C627.7,171,646,181,665,160.7C683.8,139,702,85,721,64C739.2,43,758,53,776,80.7C794.6,108,813,160,832,160.7C850.8,161,869,139,887,133.3C905.4,128,924,128,943,160C961.5,192,980,256,999,213.3C1017.7,171,1036,85,1055,58.7C1073.8,32,1092,74,1111,96.7C1129.5,119,1148,139,1166,128C1185,117,1203,75,1222,53.3C1240.8,32,1259,32,1277,58.7C1296,85,1315,139,1333,213.3C1352.3,235,1371,245,1389,250.7C1408,256,1427,256,1436,250.7L1440,288L1436,320L1427,320L1408,320L1389,320L1371,320L1352,320L1333,320L1315,320L1296,320L1277,320L1259,320L1240.8,320L1222,320L1203,320L1185,320L1166,320L1148,320L1129.5,320L1111,320L1092,320L1073.8,320L1055,320L1036,320L1017.7,320C999,320,980,320,961.5,320C943,320,924,320,905.4,320C887,320,869,320,850.8,320C832,320,813,320,794.6,320C776,320,758,320,739.2,320C721,320,702,320,683.8,320C665,320,646,320,627.7,320C609,320,591,320,572.3,320C554,320,535,320,516.9,320C498,320,480,320,461.5,320C443,320,425,320,406.2,320C388,320,369,320,350.8,320C332,320,314,320,295.4,320C277,320,258,320,240,320C222,320,203,320,184.6,320C166,320,148,320,129.2,320C111,320,92,320,73.8,320C55,320,37,320,18.5,320L0,320Z"
    ></path>
  </svg>
</button>



        </div>
        <div className="w-full md:w-1/3 hidden md:block">
          <img src="/carousal/img2.png" alt="First slide" className="w-full" />
        </div>
      </div>

      {/* Modal */}
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
};

export default Carousel;
