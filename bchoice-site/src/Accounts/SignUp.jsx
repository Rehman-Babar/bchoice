import React from "react";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <Navbar />
      <Navbar2 />
      <div className="flex justify-center items-center py-10 bg-gray-100 px-2">
        <div className="bg-white shadow-lg rounded-lg py-8 px-2 md:p-10 lg:p-12 w-full max-w-2xl">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src="/logo.png" alt="Carrot" className="mx-auto mb-2" style={{ height: "40px" }} />
          </div>

          {/* Form Fields */}
          <form className="flex flex-col md:flex-wrap md:flex-row gap-4">
            {/* First Name */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">First Name*</label>
              <input
                type="text"
                placeholder="Enter Your First Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-orange-400 to-red-400"
              />
            </div>

            {/* Last Name */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">Last Name*</label>
              <input
                type="text"
                placeholder="Enter Your Last Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Email */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">Email*</label>
              <input
                type="email"
                placeholder="Enter Your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Phone Number */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">Phone Number*</label>
              <input
                type="tel"
                placeholder="Enter Your phone number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Address */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Address*</label>
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* City */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">City*</label>
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Post Code */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">Post Code</label>
              <input
                type="text"
                placeholder="Post Code"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Country */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">Country*</label>
              <input
                type="text"
                placeholder="Country"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Region State */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">Region State*</label>
              <input
                type="text"
                placeholder="Region/State"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Signup Button */}
            <div className="w-full flex justify-between items-center mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-2 rounded-md  transition duration-200">
                Signup
              </button>
              <Link to={"/login"} className="text-sm text-[#FB8F41] hover:text-gray-800">
                Have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
