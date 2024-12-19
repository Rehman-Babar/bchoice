/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsAndroid, BsWatch } from "react-icons/bs";
import { FaAndroid } from "react-icons/fa";
import { GiClothes, GiClothJar } from "react-icons/gi";
import { FcCloth, FcElectronics } from "react-icons/fc";
import { MdSports } from "react-icons/md";
import { FaGifts } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { DiTechcrunch } from "react-icons/di";
import { TbHorseToy } from "react-icons/tb";
import { GiJewelCrown } from "react-icons/gi";
{
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g data-name="24-decorate"><path d="M53 21v4a2.006 2.006 0 0 1-2 2h-2v-8h2a2.006 2.006 0 0 1 2 2zM41 19v8h-2a2.006 2.006 0 0 1-2-2v-4a2.006 2.006 0 0 1 2-2z" style="fill:#b2876d"/><path d="M13 20v7H7v-7zM19 13v7h-6v-7z" style="fill:#a3d4ff"/><path d="M19 20v7h-6v-7zM13 13v7H7v-7z" style="fill:#65b1fc"/><path d="M19 13H7v14h12V13zm3-3v20H4V10z" style="fill:#b2876d"/><path d="M63 46v4a2.006 2.006 0 0 1-2 2H37v-6z" style="fill:#f2d1a5"/><path style="fill:#f2bb88" d="M63 40v6H37v-2h-3v-4h29z"/><path d="M45 6v34H34v-3a2.006 2.006 0 0 0-2-2h-5V8a2.006 2.006 0 0 1 2-2zm-4 21v-8h-2a2.006 2.006 0 0 0-2 2v4a2.006 2.006 0 0 0 2 2z" style="fill:#fff2de"/><path d="M63 8v32H45V6h16a2.006 2.006 0 0 1 2 2zM53 25v-4a2.006 2.006 0 0 0-2-2h-2v8h2a2.006 2.006 0 0 0 2-2z" style="fill:#f2d1a5"/><path style="fill:#b2876d" d="m10 56-3 4H4v-4h6zM31 56h3v4h-3l-3-4h3z"/><path style="fill:#ff7045" d="M7 52v4H1V44h6v8zM37 52v4h-6V44h6v8z"/><path style="fill:#ff8257" d="M34 52v4h-3V44h3v8zM7 52v4H4V44h3v8z"/><path style="fill:#ffb89c" d="M31 52v4H7v-4h24z"/><path style="fill:#ff7045" d="M7 48h24v4H7z"/><path d="M34 40v4h-3v4H7v-4H4v-7a2.006 2.006 0 0 1 2-2h26a2.006 2.006 0 0 1 2 2z" style="fill:#ff936b"/><path style="fill:#ff7045" d="M13 37h2v9h-2zM23 37h2v9h-2z"/><path style="fill:#afb4c8" d="M1 59h52v2H1zM55 59h2v2h-2z"/><path d="M35 57h2a1 1 0 0 0 1-1V44a1 1 0 0 0-1-1h-2v-6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v6H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2v2H1v2h52v-2H35zm1-2h-4V45h4zm-6 0H8v-2h22zm-2.5 2 1.5 2H9l1.5-2zm2.5-6H8v-2h22zM5 37a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v6h-2a1 1 0 0 0-1 1v3H8v-3a1 1 0 0 0-1-1H5zm-3 8h4v10H2zm3 14v-2h3l-1.5 2zm26.5 0L30 57h3v2z"/><path d="M13 37h2v9h-2zM23 37h2v9h-2zM61 5H29a3 3 0 0 0-3 3v25h2V8a1 1 0 0 1 1-1h15v32h-7v2h25v4H40v2h22v3a1 1 0 0 1-1 1H40v2h21a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zM46 39V7h15a1 1 0 0 1 1 1v31z"/><path d="M51 18h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3zm1 7a1 1 0 0 1-1 1h-1v-6h1a1 1 0 0 1 1 1zM41 28a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-2a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3zm-3-3v-4a1 1 0 0 1 1-1h1v6h-1a1 1 0 0 1-1-1zM4 31h18a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1zm1-20h16v18H5z"/><path d="M19 12H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1zm-1 7h-4v-5h4zm-6-5v5H8v-5zm-4 7h4v5H8zm6 5v-5h4v5zM55 59h2v2h-2z"/></g></svg>
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><style>.st8{fill:#e2a66f}.st11{fill:#edbb87}.st18{fill:#7a3f2c}.st21{fill:#b7c7be}.st22{fill:#d3e8df}.st61{fill:none;stroke:#b9865d;stroke-width:6;stroke-linecap:round;stroke-miterlimit:10}</style><g id="BULINE"><path id="XMLID_226_" d="M504.4 263.6c0 100.1-59.2 186.4-144.6 225.7h-.1c-.2.1-.4.2-.7.3-1.1.5-2.3 1-3.4 1.5-4.1 1.8-8.3 3.5-12.5 5.1-27 10.2-56.4 15.8-87.1 15.8-33.9 0-66.1-6.8-95.6-19.1-.9-.4-1.9-.8-2.8-1.2l-.6-.3C69.1 453.2 7.6 365.6 7.6 263.6c0-120.3 85.5-220.6 199-243.5 16-3.2 32.5-4.9 49.4-4.9 6.5 0 12.9.2 19.2.7 9.8.7 19.5 2.1 29 3.9 114.1 22.6 200.2 123.1 200.2 243.8z" style="fill:#a5cdbc"/></g><g id="ICON_1_"><g id="XMLID_1126_"><g id="XMLID_86_"><circle id="XMLID_225_" cx="255.5" cy="69.5" r="69.5" style="fill:#673528"/><path id="XMLID_224_" d="M325 69.5c0 38.4-31.1 69.5-69.5 69.5-4.2 0-8.3-.4-12.3-1.1 32.5-5.8 57.2-34.2 57.2-68.4S275.7 6.9 243.2 1.1c4-.7 8.1-1.1 12.3-1.1C293.9 0 325 31.1 325 69.5z" style="fill:#532b22"/><circle id="XMLID_223_" class="st18" cx="258.5" cy="189.2" r="127.5"/><circle id="XMLID_222_" class="st8" cx="349.3" cy="286.6" r="18.5"/><g id="XMLID_138_"><path id="XMLID_221_" class="st11" d="M258.5 432.4c-15.3 0-27.7-12.4-27.7-27.7v-50.1h55.4v50.1c0 15.3-12.4 27.7-27.7 27.7z"/><path id="XMLID_197_" class="st11" d="M356.8 477.9c1 3.8 1.8 7.8 2.3 11.7-1.1.5-2.3 1-3.4 1.5-4.1 1.8-8.3 3.5-12.5 5.1-27.1 10.2-56.5 15.8-87.2 15.8-33.9 0-66.1-6.8-95.6-19.1-.9-.4-1.9-.8-2.8-1.2.5-4.7 1.4-9.3 2.6-13.8.2-.6.3-1.2.5-1.8 9.5-34 36.2-60.8 70.1-70.4 8.8-2.5 18.1-3.8 27.7-3.8 3.8 0 7.5.2 11.2.6l2.1.3c1.6.2 3.1.4 4.6.7h.1c1.6.3 3.3.6 4.9 1l2.4.6h.1c.8.2 1.5.4 2.3.6.8.2 1.7.5 2.5.7 1.6.5 3.2 1 4.7 1.6 1.6.6 3.1 1.2 4.6 1.8.8.3 1.5.7 2.3 1 1.3.6 2.6 1.2 3.9 1.9.1 0 .1 0 .2.1.3.1.6.3.9.4.5.3 1.1.6 1.6.9.6.3 1.2.6 1.8 1 .2.1.5.3.7.4.6.3 1.2.7 1.8 1.1.6.3 1.1.7 1.6 1 .3.2.5.3.8.5.6.4 1.1.7 1.7 1.1.5.3 1 .7 1.5 1.1.2.1.4.3.6.4.6.4 1.1.8 1.7 1.2 1.8 1.4 3.6 2.8 5.3 4.3.4.3.7.6 1.1 1 1.6 1.4 3.2 2.9 4.8 4.5 1.1 1.1 2.3 2.3 3.4 3.5l2.4 2.7c1.2 1.4 2.3 2.8 3.4 4.3.4.5.7 1 1.1 1.5l2.1 3c.9 1.3 1.8 2.7 2.6 4.1.8 1.4 1.7 2.8 2.4 4.3.8 1.4 1.5 2.9 2.2 4.4 2.6 5.3 4.7 10.9 6.3 16.7.2.5.4 1.1.6 1.7z"/><path id="XMLID_169_" class="st11" d="M359.1 490.1c0-.1 0-.3-.1-.4.1.1.1.2.1.4z"/></g><g id="XMLID_108_"><path id="XMLID_110_" class="st8" d="M286.2 354.6v51.1c-.1 2-.4 4-.8 5.9l-15.7-5.9v-51.1h16.5z"/><path id="XMLID_109_" class="st8" d="M359.1 489.7c-1.1.5-2.3 1-3.4 1.5-4.1 1.8-8.3 3.5-12.5 5.1-.5-7.8-2-15.4-4.2-22.7-2.1-6.7-4.8-13.1-8.2-19.2-.1-.3-.3-.5-.5-.8-4.5-8.1-10.2-15.5-16.7-22-8.2-8.2-17.8-15-28.4-20l-15.7-5.9v-3.2l2.1.3c1.6.2 3.1.4 4.6.7h.1c1.6.3 3.3.6 4.9 1l2.4.6h.1c.8.2 1.5.4 2.3.6.8.2 1.7.5 2.5.7 1.6.5 3.2 1 4.7 1.6 1.6.6 3.1 1.2 4.6 1.8.8.3 1.5.7 2.3 1 1.3.6 2.6 1.2 3.9 1.9.1 0 .1 0 .2.1.3.1.6.3.9.4.5.3 1.1.6 1.6.9.6.3 1.2.6 1.8 1 .2.1.5.3.7.4.6.3 1.2.7 1.8 1.1.6.3 1.1.7 1.6 1 .3.2.5.3.8.5.6.4 1.1.7 1.7 1.1.5.3 1 .7 1.5 1.1.2.1.4.3.6.4.6.4 1.1.8 1.7 1.2 1.8 1.4 3.6 2.8 5.3 4.3.4.3.7.6 1.1 1 1.6 1.4 3.2 2.9 4.8 4.5 1.1 1.1 2.3 2.3 3.4 3.5l2.4 2.7c1.2 1.4 2.3 2.8 3.4 4.3.4.5.7 1 1.1 1.5l2.1 3c.9 1.3 1.8 2.7 2.6 4.1.8 1.4 1.7 2.8 2.4 4.3.8 1.4 1.5 2.9 2.2 4.4 2.6 5.3 4.7 10.9 6.3 16.7.2.6.3 1.2.5 1.8 1.2 3.8 2 7.7 2.6 11.7z"/></g><path id="XMLID_106_" class="st11" d="M258.5 387.7c-50.2 0-90.9-40.7-90.9-90.9V196.1c0-34.2 27.7-61.9 61.9-61.9h58c34.2 0 61.9 27.7 61.9 61.9v100.7c-.1 50.2-40.7 90.9-90.9 90.9z"/><path id="XMLID_105_" class="st8" d="M349.3 196.1v100.7c0 50.2-40.7 90.9-90.9 90.9-3.6 0-7.2-.2-10.7-.6 45.2-5.3 80.2-43.7 80.2-90.2V196.1c0-34.2-27.7-61.9-61.9-61.9h21.4c34.2.1 61.9 27.8 61.9 61.9z"/><path id="XMLID_104_" d="M237.5 336.6c0 9.9 8.1 18 18 18s18-8.1 18-18" style="fill:none;stroke:#e2a66f;stroke-width:10;stroke-linecap:round;stroke-miterlimit:10"/><path id="XMLID_103_" class="st61" d="M199.1 268.1c0 7 5.7 12.7 12.7 12.7s12.7-5.7 12.7-12.7"/><path id="XMLID_102_" class="st61" d="M292.5 268.1c0 7 5.7 12.7 12.7 12.7 7 0 12.7-5.7 12.7-12.7"/><circle id="XMLID_93_" class="st11" cx="167.6" cy="286.6" r="18.5"/><path id="XMLID_92_" class="st8" d="m328 258.3-90.5-59.5 17-17 76.4 55.2z"/><path id="XMLID_90_" class="st18" d="M255.5 193.2s-38.8 44.6-87.9 65.1l-18.5-61.2 26.7-75.8 72-17.8 83.1 13.3 29.1 45.3-10.6 96.2c-.1 0-80.3-51.5-93.9-65.1z"/><path id="XMLID_89_" d="M247.8 165.7s-47.7 75.7-96.5 92.6c0 0-33.2-19.4-14.4-54.4 0 0 71.3-66.7 110.9-38.2z" style="fill:#a1aca5"/><path id="XMLID_88_" class="st21" d="M360 112s62.3 60.5 5.6 146.3c0 0-75.9-110.6-208.7-83.5 0 .1 137.4-105.1 203.1-62.8z"/><path id="XMLID_87_" class="st22" d="M125.6 207.8c-7.2-37.3-2.4-96.4 79.3-138.5 3.5-1.8 7.2-3.2 11.1-4.3 24.8-6.8 115.5-24.7 155.6 62.3 0 0-71-52.9-209.9 90-11.6 12-33 6.4-36.1-9.5z"/></g><path id="XMLID_85_" class="st21" d="M359.7 489.4c-.2.1-.4.2-.7.3v.4c0-.1 0-.3-.1-.4-1.1.5-2.3 1-3.4 1.5-4.1 1.8-8.3 3.5-12.5 5.1-26.9 10.1-56.3 15.7-87 15.7-33.9 0-66.1-6.8-95.6-19.1-.9-.4-1.9-.8-2.8-1.2l-.6-.3c.2-5.5 1.5-10.6 3.7-15.3 6.5-14.3 21-24.3 37.8-24.3h120.1c4.1 0 8.1.6 11.9 1.7 11.5 3.4 21 11.7 25.9 22.6 1.7 4.1 3 8.6 3.3 13.3.1-.1 0 0 0 0z"/><path id="XMLID_71_" class="st22" d="M359.1 489.7v.4-.4c-1.1.5-2.3 1-3.4 1.5-3.7-7.4-9.5-13.5-16.7-17.6-6-3.4-13-5.4-20.5-5.4H198.4c-17 0-31.5 10.2-38 24.8-.9-.4-1.9-.8-2.8-1.2l-.6-.3c.3-4.8 1.3-9.9 3.1-14.1 6.3-14.9 21.1-25.6 38.3-25.6h120.1c4.3 0 9.4 1 13.3 2.2 11.7 3.6 20.2 11.8 24.9 23 1.5 3.6 2.6 8.3 3.1 12.4-.3.1-.5.2-.7.3z"/></g></g></svg> */
}
import "./product-card/catagries.css";

const Categories = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    // padding: 16,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div >
      <section className="section-popular ">
        <div className="container mx-auto px-10 gap-5 -mt-16 mb-14 space-x-6">
          <div className="row ">
            <div className="mb-8 mt-16 text-center">
              <h2 className="md:text-2xl text-xl font-bold text-black md:mt-3 lg:text-5xl">Categories</h2>
            </div>

            <Slider {...settings}>
              <div className="category-block text-center  p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer   ">
                <div className="category-icon mb-4 relative ">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800">
                      <FaGifts />
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg font-semibold text-gray-900">
                    <a href="">Gifts</a>
                  </h4>
                </div>
              </div>

              <div className="category-block text-center group p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer  ">
                <div className="category-icon mb-4  relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800">
                      <FaKitchenSet />
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg font-semibold text-gray-900">
                    <a href="">Home & Kitchen</a>
                  </h4>
                </div>
              </div>

              <div className="category-block text-center group p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer   group">
                <div className="category-icon mb-4  relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto ">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800 ">
                      <DiTechcrunch />
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg font-semibold text-gray-900">
                    <a href="">Tech</a>
                  </h4>
                </div>
              </div>

              <div className="category-block text-center group p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer   ">
                <div className="category-icon mb-4  relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800">
                      <FcElectronics />
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg font-semibold text-gray-900">
                    <a href="">Electronics</a>
                  </h4>
                </div>
              </div>

              <div className="category-block text-center group p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer   ">
                <div className="category-icon mb-4  relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800">
                      <TbHorseToy />
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg font-semibold text-gray-900">
                    <a href="">Toys & Games</a>
                  </h4>
                </div>
              </div>

              <div className="category-block text-center group p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer   ">
                <div className="category-icon mb-4  relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800">
                      <GiClothes />
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg font-semibold text-gray-900">
                    <a href="">Clothing</a>
                  </h4>
                </div>
              </div>

              <div className="category-block text-center group p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer   ">
                <div className="category-icon mb-1 lg:mb-4  relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800">
                      {/* <BsWatch /> */}
                      <img src="/category/beauty.png" alt="" />
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg md:text-md font-semibold text-gray-900">
                    <a href="#">Beauty & Personal Care</a>
                  </h4>
                </div>
              </div>
              <div className="category-block text-center group p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer   ">
                <div className="category-icon mb-4  relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800">
                      <img src="/category/decore.png" alt="" />
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg font-semibold text-gray-900">
                    <a href="">Home & Decor</a>
                  </h4>
                </div>
              </div>
              <div className="category-block text-center group p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-300 transition-shadow cursor-pointer   ">
                <div className="category-icon mb-4  relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="fi fi-tr-shirt-long-sleeve text-4xl text-gray-800">
                      {/* <BsWatch /> */}
                      <img src="/category/jwl.png" alt="" />
                      {/* <img src="/category/decore.png" alt="" /> */}
                    </i>
                  </div>
                </div>
                <div className="category-title">
                  <h4 className="text-lg font-semibold text-gray-900">
                    <a href="">Jewellery</a>
                  </h4>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
