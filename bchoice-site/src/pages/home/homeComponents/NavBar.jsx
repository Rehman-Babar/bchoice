/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import { FaBars, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white p-5 border-b-2 md:px-12 max-w-[1250px] mx-auto  hidden md:block">
      <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-16">
          <div className="flex items-center">
            {/* <a href="/" className=""> */}
            <img
            onClick={() => navigate('/')}
              src="/logo.png"
              alt="Logo"
              className="flex-shrink-0 h-16 w-auto md:ml-0 ml-16 sm:ml-10 flex justify-center cursor-pointer"
            />
            {/* </a>  */}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-[90%] max-w-lg">
              <input
                type="text"
                placeholder="Search For items..."
                className="w-full border border-red-400 py-2  md:px-4 rounded-md"
              />
              <select className="absolute hidden md:block inset-y-0 right-16 bg-white border border-red-400  ">
                <option>All</option>
                <option>Womens</option>
                <option>Mens</option>
                <option>Kids</option>
              </select>
              <button className="absolute inset-y-0 right-0 bg-gradient-to-r from-orange-400 to-red-400 px-6 rounded-r-md">
                <AiOutlineSearch className="text-white" />
              </button>
            </div>
          </div>
          <div className="hidden  lg:flex items-center lg:space-x-4">
            <div className="relative group flex">
              <Link to={"/signin"} className="text-gray-800 flex items-center gap-2 ">
                <FaRegUser className="w-5 h-5" />
                <span>Account</span>
              </Link>
              {/* Dropdown on hover */}
              <div className="absolute left-0 mt-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                <ul className="py-2">
                  <li>
                    <Link to={"/signin"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Register
                    </Link>
                  </li>
                  <li>
                    <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Link to={"/wishlist"} className="text-gray-800 flex items-center gap-2 ">
              <FaRegHeart className="w-5 h-5" />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="text-gray-800 flex items-center gap-2 ">
              <FiShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
