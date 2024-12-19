import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { CgSearchLoading } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("dairy");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [videoSrc, setVideoSrc] = useState(""); // Video source state
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("/");
  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  // Get cart items and calculate total count
  const cartItemsIndex = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItemsIndex.reduce((total, item) => total + item.quantity, 0);
  // const totalAmount = useSelector((state) => state.cart.totalAmount);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const closeMenu = () => {
  //   setIsOpen(false);
  // };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  const categories = [
    { id: "dairy", name: "Dairy & Bakery" },
    { id: "fruits", name: "Fruits & Vegetables" },
    { id: "snacks", name: "Snack & Spice" },
    { id: "juice", name: "Juice & Drinks" },
  ];

  const subcategories = {
    dairy: [
      { title: "Dairy", items: ["Milk", "Ice Cream", "Cheese", "Frozen Custard", "Frozen Yogurt"] },
      { title: "Bakery", items: ["Cake and Pastry", "Rusk Toast", "Bread & Buns", "Chocolate Brownie", "Cream Roll"] },
    ],
    fruits: [
      { title: "Fruits", items: ["Apple", "Banana", "Mango", "Orange", "Pineapple"] },
      { title: "Vegetables", items: ["Cauliflower", "Bell Peppers", "Broccoli", "Cabbage", "Tomato"] },
    ],
    snacks: [
      { title: "Snacks", items: ["French Fries", "Potato Chips", "Biscuits & Cookies", "Popcorn", "Rice Cakes"] },
      {
        title: "Spice",
        items: ["Cinnamon Powder", "Cumin Powder", "Fenugreek Powder", "Pepper Powder", "Long Pepper"],
      },
    ],
    juice: [
      { title: "Juice", items: ["Mango Juice", "Coconut Water", "Tetra Pack", "Apple Juice", "Lychee Juice"] },
      { title: "Soft Drink", items: ["Breizh Cola", "Green Cola", "Jolt Cola", "Mecca Cola", "Topsia Cola"] },
    ],
  };
  const openModal = () => {
    setVideoSrc("https://www.youtube.com/embed/tQ9d-6Rm1n0?autoplay=1&rel=0&si=KGy_Om5Y9lIfNcK3"); // Set video source on modal open
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoSrc(""); // Clear the video source when closing the modal
  };

  return (
    <nav
      className={`bg-white w-full z-40 shadow-md transition-all duration-300 ${
        isScrolled ? "fixed top-0" : "relative"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="relative">
            <div className="flex gap-4 items-center justify-center">
              <button className="text-black focus:outline-none lg:hidden" onClick={toggleMenu}>
                {isOpen ? <FaTimes size={24} /> : <CiMenuFries size={24} />}
              </button>
              <img src="/logo.png" onClick={() => navigate('/')} className="md:w-32 w-28 block lg:hidden cursor-pointer" alt="logo" />
            </div>

            <div className="hidden lg:block relative group">
              <button className="text-black focus:outline-none">
                <CiMenuFries size={24} />
              </button>
              <div className="absolute top-6 left-0 w-[570px] bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out invisible group-hover:visible z-50">
                <div className="flex">
                  <div className="w-[100%] border-r p-4 space-y-3 mt-2 ">
                    {categories.map((category) => (
                      <div key={category.id} className="mb-2">
                        <button
                          onClick={() => setSelectedCategory(category.id)}
                          className={`border-2 px-2 rounded-md pr-5 py-2 ${
                            selectedCategory === category.id ? "border-[#F3473A]" : "border-[#E5E7EB]"
                          }`}>
                          {category.name}
                        </button>
                      </div>
                    ))}
                  </div>

                  {selectedCategory && (
                    <div className="w-[70rem] flex">
                      {subcategories[selectedCategory].map((subcategory, index) => (
                        <div key={index} className="w-[120%] p-4 border-r">
                          <h3 className="font-bold text-red-500 mb-2 border-b-2">{subcategory.title}</h3>
                          <ul>
                            {subcategory.items.map((item, itemIndex) => (
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
                  )}
                </div>
              </div>
            </div>
          </div>

              <div className="hidden lg:flex space-x-8 relative">
                <Link
                  to="/"
                  className="relative text-[#0D0D0D] font-semibold hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-[#0D0D0D] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                >
                  Home
                </Link>
                <a
                  href="#catagory"
                  className="relative text-[#0D0D0D] font-semibold hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-[#0D0D0D] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                >
                  Category
                </a>
                <a
                  href="#new arrival"
                  className="relative text-[#0D0D0D] font-semibold hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-[#0D0D0D] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                >
                  New Arrival
                </a>
                <a
                  href="#allproducts"
                  className="relative text-[#0D0D0D] font-semibold hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-[#0D0D0D] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                >
                  All Products
                </a>
                <a
                  href="#bestdeals"
                  className="relative text-[#0D0D0D] font-semibold hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-[#0D0D0D] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                >
                  Best Deals
                </a>
                <button
                  onClick={openModal}
                  className="relative text-[#0D0D0D] font-semibold hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-[#0D0D0D] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                >
                  Your Choice
                </button>
                <Link
                  to="/about-us"
                  className="relative text-[#0D0D0D] font-semibold hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-[#0D0D0D] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                >
                  About Us
                </Link>

                <div className="relative group">
                  <button
                    className="flex items-center text-[#0D0D0D] font-semibold hover:text-gray-600"
                  >
                    More
                    <span className="ml-1">
                      <MdExpandMore className="text-xl group-hover:hidden" />
                      <MdExpandLess className="text-xl hidden group-hover:inline" />
                    </span>
                  </button>
                  <div className="absolute z-10 mt-0 bg-white shadow-lg rounded-xs border-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                    <Link
                      to="/policy"
                      className="block px-7 py-2 text-[#0D0D0D] hover:bg-gray-200 border-b"
                    >
                      Policy
                    </Link>
                    <Link
                      to="/faq-page"
                      className="block px-7 py-2 text-[#0D0D0D] hover:bg-gray-200 border-b"
                    >
                      FAQs
                    </Link>
                    <Link
                      to="/blog-page"
                      className="block px-7 py-2 text-[#0D0D0D] hover:bg-gray-200 border-b"
                    >
                      Blogs
                    </Link>
                  </div>
                </div>
              </div>

                      {/* <Link to={"/top-collection/:id"} className="text-[#0D0D0D] font-semibold hover:text-gray-600">
              Best Selling
            </Link> */}

          {/* Large screen Cart Icon */}

          <Link to="/cart" className="relative text-gray-800 flex items-center gap-2 hidden lg:block">
            <FiShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Small screens cart icon */}
          <div className="flex space-x-4 lg:hidden items-center">
            <CgSearchLoading className="text-black" size={32} />
            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-black " size={26} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Small screen dropdown */}
        <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
          <Link to={"/"} className="block text-black hover:text-gray-600">
            Home
          </Link>
          <a href="#catagory" className="block text-black hover:text-gray-600">
            Category
          </a>
          <Link to={"/policy"} className="block text-black hover:text-gray-600">
            Policy
          </Link>
          <Link to={"/faq-page"} className="block text-black hover:text-gray-600">
            FAQs
          </Link>
          <Link to={"/blog page"} className="block text-black hover:text-gray-600">
            Blogs
          </Link>
          <Link to={"/about-us"} className="block text-black hover:text-gray-600">
            About Us
          </Link>
          <Link to={"/top-collection"} className="block text-black hover:text-gray-600">
            Best Selling
          </Link>
        </div>
      </div>
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
    </nav>
  );
};

export default Navbar2;
