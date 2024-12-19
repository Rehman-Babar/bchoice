import React, { useState } from "react";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import { Link } from "react-router-dom";
import ScrollingText from "../pages/home/homeComponents/ScrollingText";
import ReviewCard from "./ReviewCard";
import { FaYoutube } from "react-icons/fa6";
import FeedbackModal from "../pages/home/homeComponents/ReviewModal";
import Footer from "../pages/Footer";

const Reviews = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const reviewsData = [
    {
      id: 1,
      name: "Ali Haider",
      date: "10 months ago",
      rating: 5,
      comment:
        "I am truly satisfied with the team of Bservices. They are talented and sincere with the work they are doing.",
      reply: "Thank You So Much",
    },
    {
      id: 2,
      name: "Elizabeth",
      date: "1 year ago",
      rating: 5,
      comment:
        "Bilal and his team were very professional and were great to work with. They were always on time and finished the job when they promised.",
      reply: "Thank You So Much",
    },
    {
      id: 3,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
    {
      id: 34,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
    {
      id: 5,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
    {
      id: 36,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
    {
      id: 987,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
    {
      id: 334,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
    {
      id: 34568,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
    {
      id: 3456789876,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
    {
      id: 8765454678,
      name: "Asif Ali",
      date: "1 year ago",
      rating: 5,
      comment: "The service quality is consistently outstanding, exceeding my expectations every time.",
      reply: "Thank You So Much",
    },
  ];
  const [visibleReviews, setVisibleReviews] = useState(4);
  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3); // Load 3 more reviews each time
  };

  return (
    <>
      <Navbar />
      <Navbar2 />
      <ScrollingText />
      <div className="bg-gradient-to-r from-orange-400 to-red-400">
        <div className="flex justify-between px-4 py-3 md:px-14 md:py-5 items-center glass h-full rounded-none bg-gradient-to-r from-orange-400 to-red-400 max-w-[1550px] mx-auto mb-20">
          <h1 className="text-lg md:text-2xl font-bold text-white">Customer Reviews</h1>
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
                    to={"/reviews"}
                    className="ms-1 text-xs md:text-lg font-medium text-white hover:text-blue-600 md:ms-2">
                    Reviews
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <button className=" flex justify-center mx-auto  px-8 py-2 text-center border border-[#FA8257] font-semibold text-[#FA8257] cursor-none">
        Customer Reviews
      </button>
      <h1 className="text-center font-bold text-3xl md:text-5xl mt-3">Our Clients Reviews</h1>
      <p className="text-center max-w-md mt-3 mx-auto">
        Hear from our satisfied clients - real success stories, genuine endorsements, and the proof of our excellence.
      </p>

      <div className="container mx-auto p-4 mb-10">
        <div className="bg-white rounded-lg  flex flex-col md:flex-row gap-12 px-1 md:px-10">
          <div className="">
            <div className="flex flex-wrap gap-2 justify-center w-full mx-auto">
              <a
                href="https://www.youtube.com/playlist?list=PLNjwG6uUEU3LGK0rnNbH7WFTshRfhWRe8"
                className="flex items-center gap-1 px-3 py-2 text-center border border-[#FA8257] font-semibold text-[#FA8257] sm:px-5">
                <FaYoutube /> Video Reviews
              </a>
              <button
                className="px-3 py-1 text-center border border-[#FA8257] font-semibold text-[#FA8257] sm:px-5"
                onClick={() => setModalOpen(true)}>
                Customer Reviews
              </button>
              <FeedbackModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            </div>

            {/* Average Rating Section */}
            <div className="mb-6 mt-6 p-4 text-center border-2 border-[#FA8257] rounded-s-lg rounded-ee-xl">
              <h3 className="text-lg font-semibold">Average user rating</h3>
              <p className="text-gray-500">Total Reviews: 159</p>
              <div className="text-4xl font-bold mt-2">
                4.95 <span className="text-lg text-gray-500">/ 5</span>
              </div>
              <div className="flex items-center justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-blue-500 text-3xl text-center mx-auto">
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold">Rating breakdown</h4>
              <div className="space-y-2 mt-2">
                <div className="flex items-center">
                  <span className="w-5 text-yellow-500"> 5★</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: "96%" }}></div>
                  </div>
                  <span>154</span>
                </div>
                <div className="flex items-center">
                  <span className="w-5 flex text-yellow-500">4★</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "2%" }}></div>
                  </div>
                  <span>3</span>
                </div>
                <div className="flex items-center">
                  <span className="w-5 text-yellow-500">3★</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: "1%" }}></div>
                  </div>
                  <span>1</span>
                </div>
                <div className="flex items-center">
                  <span className="w-5 text-yellow-500">2★</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: "1%" }}></div>
                  </div>
                  <span>1</span>
                </div>
                <div className="flex items-center">
                  <span className="w-5 text-yellow-500">1★</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: "0%" }}></div>
                  </div>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Reviews */}
          <div className="space-y-6">
            {reviewsData.slice(0, visibleReviews).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {visibleReviews < reviewsData.length && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMoreReviews}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reviews;
