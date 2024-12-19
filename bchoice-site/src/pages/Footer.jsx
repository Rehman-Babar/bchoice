import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePhoneCallback, MdOutgoingMail } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoPinterest } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 body-font border-t-2 px-8">
      <div className="container mx-auto py-8 grid gap-8 grid-cols-1 lg:grid-cols-4">
        {/* Logo and Contact Info */}
        <div className="text-center lg:text-left">
          <a
            href="/"
            className="flex title-font font-medium items-center justify-center lg:justify-start text-gray-900 mb-4">
            <img src="/logo.png" alt="Logo" className="h-12" data-aos="zoom-out-right" />
          </a>
          <p className="text-sm text-gray-500 mb-4">
            The ultimate online shopping experience. Quality, convenience, <br /> and affordability - all under one
            roof.
          </p>
          <div>
            <div className="flex items-center mb-2">
              <FaLocationDot className="text-[#F3473A] mr-2" />
              <p className="text-sm text-gray-500">Faiz Road, Main Canal Rd, Muslim Town Lhr, Lahore, 54000</p>
            </div>
            <div className="flex items-center mb-2">
              <MdOutgoingMail className="text-[#F3473A] mr-2" />
              <p className="text-sm text-gray-500">example@dreambazar.store</p>
            </div>
            <div className="flex items-center">
              <MdOutlinePhoneCallback className="text-[#F3473A] mr-2" />
              <p className="text-sm text-gray-500">+92 1234 567890</p>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div className="lg:pl-12">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Company</h2>
          <nav className="list-none space-y-2">
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Delivery Information
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Support Center
              </a>
            </li>
          </nav>
        </div>

        {/* Top Categories */}
        <div className="lg:pl-12">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Top Categories</h2>
          <nav className="list-none space-y-2">
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Fashion & Clothes
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Dairy & Bakery
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Fruits & Vegetables
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Snacks & Spice
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Juice & Drinks
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-[#F3473A]">
                Fast Food
              </a>
            </li>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="lg:pl-12">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Newsletter</h2>
          <p className="text-gray-500 mb-5 text-sm">Subscribe to get in touch.</p>
          <div className="flex items-center py-2 mb-4">
            <input
              type="text"
              className="bg-white border-none w-full  text-gray-700 py-2 px-2 pl-3 rounded-s leading-tight focus:outline-none"
              placeholder="Search here..."
            />
            <button className="bg-white hover:bg-gray-400 text-gray-800 font-bold py-[6px] px-4 rounded-e">
              <IoIosSend className="size-6" />
            </button>
          </div>
          <div className="flex justify-center lg:justify-start space-x-6">
            <a href="/" className="text-gray-600 hover:text-[#F3473A] px-2 py-2 bg-white rounded-sm">
              <FaFacebookF />
            </a>
            <a href="/" className="text-gray-600 hover:text-[#F3473A] px-2 py-2 bg-white rounded-sm">
              <FaXTwitter />
            </a>
            <a href="/" className="text-gray-600 hover:text-[#F3473A] px-2 py-2 bg-white rounded-sm">
              <IoLogoPinterest />
            </a>
            <a href="/" className="text-gray-600 hover:text-[#F3473A] px-2 py-2 bg-white rounded-sm">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 py-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-5">
          <p className="text-gray-500 text-sm text-center sm:text-left">
          © 2025 Bchoice, All rights reserved. Develop By Rehman Babar From Bservices
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
