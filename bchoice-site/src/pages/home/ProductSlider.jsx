import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade"; // Import fade effect CSS
import "./product-card/deal.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductSlider = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 24,
    minutes: 17,
    seconds: 6,
  });
  const [showModal, setShowModal] = useState(false); // Modal state
  const [videoSrc, setVideoSrc] = useState(""); // Video source state

  const formatTime = (num) => (num < 10 ? `0${num}` : num);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      updateTime();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerInterval);
  }, [time]);
  const openModal = () => {
    setVideoSrc("https://www.youtube.com/embed/tQ9d-6Rm1n0?autoplay=1&rel=0&si=KGy_Om5Y9lIfNcK3"); // Set video source on modal open
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoSrc(""); // Clear the video source when closing the modal
  };

  // Update the time function
  const updateTime = () => {
    const { days, hours, minutes, seconds } = time;

    if (seconds > 0) {
      setTime({ ...time, seconds: seconds - 1 });
    } else if (minutes > 0) {
      setTime({ ...time, minutes: minutes - 1, seconds: 59 });
    } else if (hours > 0) {
      setTime({ ...time, hours: hours - 1, minutes: 59, seconds: 59 });
    } else if (days > 0) {
      setTime({ ...time, days: days - 1, hours: 23, minutes: 59, seconds: 59 });
    }
  };
  return (
    <>
      <section className="section-deal border-2 absolute translate-y-12 lg:translate-y-56   z-20 flex w-[20rem] px-2 py-4 ml-10 lg:items-center lg:justify-center  glass lg:w-[32rem] max-w-[1550px] hidden md:block ">
        <div className="bg-banner-deal">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap">
              <div className="w-full ">
                <div className="cr-deal-rightside">
                  <div className="cr-deal-content space-y-3 flex flex-col" data-aos="fade-up" data-aos-duration="2000">
                    <span className="font-bold">
                      <code className="text-[#F3473A]">40%</code> OFF
                    </span>
                    <h4 className="cr-deal-title text-black text-3xl font-bold">Great deal on Gift Collection.</h4>
                    <p className=" ">
                    Discover amazing deals on our Gift Collection—perfect for every occasion! Shop now for exclusive discounts!
                    </p>
                    <div id="timer" className="cr-counter border-2 border-red-500 rounded-md flex inline-block px-7 py-2">
                      <div className="cr-counter-inner flex space-x-4 mx-auto font-bold ">
                        <h4 className="flex flex-col">
                          <span id="days">{formatTime(time.days)}</span>
                          Days
                        </h4>
                        <div className=" mt-3 font-bold text-lg">:</div>
                        <h4 className="flex flex-col">
                          <span id="hours">{formatTime(time.hours)}</span>
                          Hrs
                        </h4>
                        <div className=" mt-3 font-bold text-lg">:</div>
                        <h4 className="flex flex-col">
                          <span id="minutes">{formatTime(time.minutes)}</span>
                          Min
                        </h4>
                        <div  className=" mt-3 font-bold text-lg">:</div>
                        <h4 className="flex flex-col">
                          <span id="seconds">{formatTime(time.seconds)}</span>
                          Sec
                        </h4>
                      </div>
                    </div>
                    <button
                    onClick={openModal}
                        className="relative  px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-red-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section> for smaller screen media  </section> */}
      <section  className="block md:hidden glass absolute z-20 mt-20 rounded-sm px-3 py-3 ml-4 font-semibold text-black">
        <h3>
          40% <span> OFF</span>
        </h3>
        <h2>Great deal on {"Womens"} Fashion.</h2>
        {/* <div id="timer" className="cr-counter border-2 border-gray-300 rounded-md inline-block px-7 py-2"></div> */}
      </section>

      <Swiper
        loop={true}
        modules={[Scrollbar, A11y, EffectFade, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        effect="fade" // Apply the fade effect
        fadeEffect={{ crossFade: true }} // Ensure cross-fade is enabled for smoother transitions
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Change image every 3 seconds
        speed={1000} // Speed of the fade effect
        className="mb-4 mx-auto max-w-[1550px] z-10">
        <SwiperSlide className="w-full">
          <img
            src="/deal/bg-deal-2.jpg"
            alt="Deal 2"
            className="w-full h-[13rem] sm:h-[17rem]  md:h-[25rem] lg:h-[40rem]"
          />
        </SwiperSlide>
        <SwiperSlide  className="w-full">
          <img
            src="/deal/bg-deal-3.jpg"
            alt="Deal 3"
            className="w-full h-[12rem] sm:h-[17rem] md:h-[25rem] lg:h-[40rem]"
          />
        </SwiperSlide>
        {/* <SwiperSlide className="w-full">
          <img src="/deal/bg-deal.jpg" alt="Deal" className="w-full h-[12rem] sm:h-[17rem] md:h-[25rem] lg:h-[40rem]" />
        </SwiperSlide> */}
      </Swiper>
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
    </>
  );
};

export default ProductSlider;
