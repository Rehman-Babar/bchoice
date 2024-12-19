import React, { useState } from "react";
import { FaBars, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown menu on smaller screens
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Categories data for the dropdown
  const categories = [
    {
      name: "Dairy & Bakery",
      items: ["Milk", "Ice Cream", "Cheese", "Frozen Custard", "Frozen Yogurt"],
    },
    {
      name: "Dairy",
      items: ["Milk", "Ice Cream", "Cheese", "Frozen Custard", "Frozen Yogurt"],
    },
    {
      name: "Bakery",
      items: ["Cake And Pastry", "Rusk Toast", "Bread & Buns", "Chocolate Brownie", "Cream Roll"],
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Menu Button for small screens */}
          <div className="relative">
            <button className="text-black focus:outline-none lg:hidden" onClick={toggleMenu}>
              <FaBars size={24} />
            </button>

            {/* Menu button with hover effect on large screens */}
            <button className="text-black focus:outline-none hidden lg:block relative group">
              <FaBars size={24} />
              {/* Dropdown menu */}
              <div className="absolute top-10 left-0 w-64 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out invisible group-hover:visible z-50">
                <div className="flex">
                  {categories.map((category, index) => (
                    <div key={index} className="w-1/3 border-r p-4">
                      <h3 className="font-bold text-red-500 mb-2">{category.name}</h3>
                      <ul>
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="mb-2">
                            <a href="#" className="text-gray-800 hover:text-red-500">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Links for large screens */}
          <div className="hidden lg:flex space-x-8">
            <a href="#" className="text-black hover:text-gray-600">
              Home
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              Category
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              Track Order
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              Check Out
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              FAQs
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              Blogs
            </a>
          </div>

          {/* Icons for small screens */}
          <div className="flex space-x-4 lg:hidden">
            <FaUser className="text-black" size={20} />
            <FaHeart className="text-black" size={20} />
            <FaShoppingCart className="text-black" size={20} />
          </div>
        </div>

        {/* Dropdown Menu for small screens */}
        <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
          <a href="#" className="block text-black hover:text-gray-600 py-2">
            Home
          </a>
          <a href="#" className="block text-black hover:text-gray-600 py-2">
            Category
          </a>
          <a href="#" className="block text-black hover:text-gray-600 py-2">
            Track Order
          </a>
          <a href="#" className="block text-black hover:text-gray-600 py-2">
            Check Out
          </a>
          <a href="#" className="block text-black hover:text-gray-600 py-2">
            FAQs
          </a>
          <a href="#" className="block text-black hover:text-gray-600 py-2">
            Blogs
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
