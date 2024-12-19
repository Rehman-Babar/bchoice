import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "../home/product-card/deal.css";
import Footer from "../Footer";
import Navbar from "../home/homeComponents/NavBar";
import Navbar2 from "../home/homeComponents/NavBar2";

const AboutUs = () => {
  const [activeButton, setActiveButton] = useState("Who We Are");

  // Data corresponding to each button
  const content = {
    "Who We Are":
      "As a dynamic team of digital artisans, we specialize in Digital Marketing (Google Ads, Facebook, Instagram Ads, TikTok Advertising...), Video Editing (Lyric Video, Promo Video, Commercial Ads, YouTube Channel Editing, Ceremony Videos),Graphic Design (Logo Design, Social Media Posts, Company Profile, Cover Arts...), Web Development, 2D & 3D Animation, Game/App Crafting, Company Registration, and more, ensuring 100% Security and Satisfaction. With our innovative approach, we bring your visions to life in the virtual realm, ensuring optimal SEO ranking and captivating user experiences.",
    "Our Vision":
      "At Bservices, our vision is to amplify your digital business. With unwavering commitment, we empower creativity, transform businesses, and shape the future of digital services. Our aim is to ignite growth, enhance brand presence, and maximize your potential in the ever-evolving digital landscape. Trust us to provide innovative solutions and industry-leading expertise to help you thrive in the digital world. Together, let's create a brighter future for your business.",
    "Our History":
      "Bservices has a rich history rooted in digital services, starting our journey years ago. With a wealth of experience, we have successfully navigated the ever-changing digital landscape. Our evolution closely aligns with the dynamic tech industry, characterized by innovation, overcoming challenges, and accumulating expertise that defines us today. Trust in our proven track record as we continue to adapt and provide cutting-edge solutions to meet the evolving needs of our clients.",
  };

  return (
    <>
      <Navbar />
      <Navbar2 />
      <div className="bg-gradient-to-r from-orange-400 to-red-400">
        <div className="flex justify-between px-4 py-3 md:px-14 md:py-5 items-center glass h-full rounded-none bg-gradient-to-r from-orange-400 to-red-400 max-w-[1550px] mx-auto mb-20">
          <h1 className="text-lg md:text-2xl font-bold text-white">About us</h1>
          <nav className="flex justify-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to={"/"}
                  className="inline-flex items-center text-xs md:text-lg font-medium text-white hover:text-blue-600">
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-white mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    to={"/about-us"}
                    className="ms-1 text-xs md:text-lg font-medium text-white hover:text-blue-600 md:ms-2">
                    About us
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="max-w-[1550px] mx-auto">
        {/* <h1 className=" text-3xl md:text-5xl text-gray-900 px-7 md:px-12 mb-10 mt-3 tracking-wider">About Us</h1> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 px-7 md:px-12 mt-10 mb-16">
          <div className="swiper-container">
            <Swiper
              modules={[Scrollbar, A11y, EffectFade, Autoplay]}
              loop={true}
              spaceBetween={50}
              slidesPerView={1}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              speed={1000}
              className="mx-auto">
              <SwiperSlide>
                <img
                  src="https://images.pexels.com/photos/1553783/pexels-photo-1553783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Deal 2"
                  className="w-full h-[15rem] md:h-[20rem] lg:h-[38rem] object-cover rounded-l-lg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Deal 3"
                  className="w-full h-[15rem] md:h-[20rem] lg:h-[38rem] object-cover rounded-l-lg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.pexels.com/photos/2046773/pexels-photo-2046773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Deal"
                  className="w-full h-[15rem] md:h-[20rem] lg:h-[38rem] object-cover rounded-l-lg"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          {/*  */}
          <div className="bg-[#F5F5F5] px-8 py-2 flex flex-col ">
            <h2 className="text-2xl md:text-3xl text-gray-900  mt-10 mb-5 flex items-center gap-3">
              <div className="w-7 h-1 rounded-sm bg-blue-700"></div>Our Story
            </h2>
            <h1 className=" text-gray-900 lg:text-5xl md:text-3xl sm:text-2xl font-bold pr-7">
              Our team comes with the experience and knowledge
            </h1>

            <div className="mt-7 lg:py-4 py-2 px-3 lg:px-6 bg-white rounded-md flex flex-col items-center justify-center md:flex-row gap-6 lg:justify-between">
              <button
                className={`lg:py-4 lg:px-6 py-2 px-3 rounded-md font-bold transition-all duration-300 w-full md:w-auto ${
                  activeButton === "Who We Are" ? "bg-blue-500 text-white" : "bg-[#F5F5F5]"
                }`}
                onClick={() => setActiveButton("Who We Are")}>
                Who We Are
              </button>
              <button
                className={`lg:py-4 lg:px-6 py-2 px-3 rounded-md font-bold transition-all duration-300 w-full md:w-auto ${
                  activeButton === "Our Vision" ? "bg-blue-500 text-white" : "bg-[#F5F5F5]"
                }`}
                onClick={() => setActiveButton("Our Vision")}>
                Our Vision
              </button>
              <button
                className={`lg:py-4 lg:px-6 py-2 px-3 rounded-md font-bold transition-all duration-300 w-full md:w-auto ${
                  activeButton === "Our History" ? "bg-blue-500 text-white" : "bg-[#F5F5F5]"
                }`}
                onClick={() => setActiveButton("Our History")}>
                Our History
              </button>
            </div>

            <div className="mt-6">
              <p className="tracking-wide leading-5">{content[activeButton]}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
