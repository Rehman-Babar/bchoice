/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./product-card/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice.js";
import Loader from "../../hook/Loader.jsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CrdsSkeltons from "../../hook/CrdsSkeltons.jsx";
import VideoModal from "../../hook/VideoModal.jsx";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [isHovered, setIsHovered] = useState(false); // State to manage hover effect for buttons
    // State to control the video modal
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  

  useEffect(() => {
    if (status === "idle" && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [status, dispatch, products.length]);

  const openVideoModal = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };
  
  // Function to close the video modal
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideoUrl("");
  };
  // console.log(currentVideoUrl)

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error: {error}</p>
        <button onClick={() => dispatch(fetchProducts())} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  // Custom arrow components for navigation
  const NextArrow = ({ onClick }) => {
    const handleClick = () => {
      onClick(); // Proceed with Slick's next functionality
    };
    return (
      <button
        onClick={handleClick}
        className={`absolute  top-1/2 mt-48 md:mt-0  right-20 md:right-2 transform -translate-y-1/2 bg-black text-white p-1 md:p-2 text-xs md:text-base rounded-full z-10 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-100 md:opacity-0"
        }`}>
        <IoIosArrowForward size={16} className="md:text-xl" />
      </button>
    );
  };
  
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 left-20 md:left-2 mt-48 md:mt-0 transform -translate-y-1/2 bg-black text-white p-1 md:p-2 text-xs md:text-base rounded-full z-10 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-100 md:opacity-0"
      }`}>
      <IoIosArrowBack size={16} className="md:text-xl" />
    </button>
  );
  

  const settings = {
    infinite: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    // padding
    // padding: 45,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1224, // for medium screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024, // for medium screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // for small screens
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  // console.log(products.videoUrl)

  return (
    <>
      <h1 className="text-black  pb-3 text-center lg:text-center md:text-5xl text-3xl mt-6 md:mt-16 font-bold" >
        New Arrivals
      </h1>
      <div className="relative px-0 md:px-0 lg:px-10 md:py-8 pb-10 py-1 space-y-24  bg-white" >
        {/* Slider container with hover event handlers */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)} // Show buttons on hover
          onMouseLeave={() => setIsHovered(false)} // Hide buttons when not hovering
        >
          
            {
              status === "loading" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <CrdsSkeltons key={index} />
                ))}
            </div>
              ) : products?.length === 0 ? (
                <div className="text-center p-4">
              <p className="text-lg font-bold text-red-500">No products available at the moment.</p>
            </div>
              ) :(
                <Slider {...settings} className="left-aligned-slider">
            {products?.map((product, index) => (
              <div key={index} aria-label={`Product ${index + 1}`}>
                <ProductCard {...product} openVideoModal={openVideoModal} />
              </div>
            ))}
            </Slider>
              )
            }
            
          
        </div>
      </div>
      <VideoModal 
        isVidoeModalOpen={isVideoModalOpen} 
        videoUrl={currentVideoUrl} 
        closeVidoeModal={closeVideoModal} 
      />
      
    </>
  );
};

export default ProductList;
