import React from "react";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import { Link } from "react-router-dom";
import Footer from "../pages/Footer";

const Policy = () => {
  return (
    <>
      <Navbar />
      <Navbar2 />
      <div className="bg-gradient-to-r from-orange-400 to-red-400">
        <div className="flex justify-between px-4 py-3 md:px-14 md:py-5 items-center glass h-full rounded-none bg-gradient-to-r from-orange-400 to-red-400 max-w-[1550px] mx-auto mb-20">
          <h1 className="text-lg md:text-2xl font-bold text-white">Policy</h1>
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
                    to={"/policy"}
                    className="ms-1 text-xs md:text-lg font-medium text-white hover:text-blue-600 md:ms-2">
                    Policy
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <div className="text-lg">Check ou Privacy Policy and Conditions</div>
      </div>

      <div className=" md:px-10 lg:px-20 mt-5 mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 rounded-md p-4 space-y-10">
          <div className="">
            <h2 className="text-2xl mb-2 font-semibold">Welcome to Carrot Store.</h2>
            <p className="font-semibold text-[#9A9A9A]">
              At Carrot Store, we understand the importance of maintaining a secure and confidential online environment.
              Our privacy policy is designed to protect your personal information and respect your privacy rights.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl mb-2 font-semibold">Carrot Websites.</h2>
            <p className="font-semibold text-[#9A9A9A]">
              At Carrot Store, we understand the importance of maintaining a secure and confidential online environment.
              Our privacy policy is designed to protect your personal information and respect your privacy rights.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl mb-2 font-semibold">How browsing and vendor works?</h2>
            <p className="font-semibold text-[#9A9A9A]">
              At Carrot Store, we understand the importance of maintaining a secure and confidential online environment.
              Our privacy policy is designed to protect your personal information and respect your privacy rights.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl mb-2 font-semibold">Becoming an vendor.</h2>
            <p className="font-semibold text-[#9A9A9A]">
              At Carrot Store, we understand the importance of maintaining a secure and confidential online environment.
              Our privacy policy is designed to protect your personal information and respect your privacy rights.
            </p>
          </div>
        </div>
        <div className="border-2 rounded-lg p-4 space-y-10">
          <div className="">
            <h2 className="text-2xl mb-2 font-semibold">How browsing and vendor works?</h2>
            <p className="font-semibold text-[#9A9A9A]">
              At Carrot Store, we understand the importance of maintaining a secure and confidential online environment.
              Our privacy policy is designed to protect your personal information and respect your privacy rights.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl mb-2 font-semibold">Becoming an vendor.</h2>
            <p className="font-semibold text-[#9A9A9A]">
              At Carrot Store, we understand the importance of maintaining a secure and confidential online environment.
              Our privacy policy is designed to protect your personal information and respect your privacy rights.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl mb-2 font-semibold">How browsing and vendor works?</h2>
            <p className="font-semibold text-[#9A9A9A]">
              At Carrot Store, we understand the importance of maintaining a secure and confidential online environment.
              Our privacy policy is designed to protect your personal information and respect your privacy rights.
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl mb-2 font-semibold">Welcome to Carrot Store.</h2>
            <p className="font-semibold text-[#9A9A9A]">
              At Carrot Store, we understand the importance of maintaining a secure and confidential online environment.
              Our privacy policy is designed to protect your personal information and respect your privacy rights.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Policy;
