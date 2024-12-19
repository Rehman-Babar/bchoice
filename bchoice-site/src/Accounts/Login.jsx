import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import Footer from "../pages/Footer";

const LogIn = () => {
  return (
    <>
      <Navbar />
      <Navbar2 />
      <div className="flex justify-center items-center py-10 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-10 lg:p-12 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src="/logo.png" alt="Carrot" className="mx-auto mb-2" style={{ height: "40px" }} />
            <h1 className="text-2xl font-semibold">Carrot</h1>
          </div>

          {/* Form Fields */}
          <form>
            {/* Email Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Email Address*</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Password*</label>
              <input
                type="password"
                placeholder="Enter Your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8F41]"
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
                Login
              </button>
            </div>

            {/* Signup Link */}
            <div className="text-center">
              <Link to={"/signin"} className="text-sm text-[#FB8F41] hover:text-gray-800">
                Signup?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
