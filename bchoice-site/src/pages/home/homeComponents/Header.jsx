import React, { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdExpandLess, MdExpandMore, MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const cartItemsIndex = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItemsIndex.reduce((total, item) => total + item.quantity, 0);
  const [showModal, setShowModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openModal = () => {
    setVideoSrc("https://www.youtube.com/embed/tQ9d-6Rm1n0?autoplay=1&rel=0&si=KGy_Om5Y9lIfNcK3");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoSrc(""); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white ">
      <div className="flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex md:gap-3 gap-1">
          
          <img
            src="/logo.png"
            alt="Bchoice Logo"
            className="w-28 md:w-44"
          />
          <div className="flex lg:hidden border-2 border-black items-center justify-center md:px-2 py-[-20px] p-1 rounded-sm">
            <FaSearch className="text-lg md:text-xl hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        <nav className="hidden lg:flex space-x-6 text-base md:text-[15px] text-black">
          <Link
            to="/"
            onClick={() => setActiveLink('Home')}
            className={`relative font-semibold text-[#0D0D0D] hover:text-gray-600 
              after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] 
              ${activeLink === 'Home' ? 'after:bg-pink-500 after:scale-x-100' : 'after:bg-[#0D0D0D] after:scale-x-0'} 
              after:origin-left after:transition-transform hover:after:scale-x-100`}
          >
            Home
          </Link>

          <Link
            to="/all-products"
            onClick={() => setActiveLink('All Products')}
            className={`relative font-semibold text-[#0D0D0D] hover:text-gray-600 
              after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] 
              ${activeLink === 'All Products' ? 'after:bg-pink-500 after:scale-x-100' : 'after:bg-[#0D0D0D] after:scale-x-0'} 
              after:origin-left after:transition-transform hover:after:scale-x-100`}
          >
            All Products
          </Link>

          <button
            onClick={() => {
                setActiveLink('Custom Gift')
                openModal()
            }}
            className={`relative font-semibold text-[#0D0D0D] hover:text-gray-600 
              after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] 
              ${activeLink === 'Custom Gift' ? 'after:bg-pink-500 after:scale-x-100' : 'after:bg-[#0D0D0D] after:scale-x-0'} 
              after:origin-left after:transition-transform hover:after:scale-x-100`}
          >
            Custom Gift
          </button>

          <a
            href='#bestdeals'
            onClick={() => setActiveLink('Best Deals')}
            className={`relative font-semibold text-[#0D0D0D] hover:text-gray-600 
              after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] 
              ${activeLink === 'Best Deals' ? 'after:bg-pink-500 after:scale-x-100' : 'after:bg-[#0D0D0D] after:scale-x-0'} 
              after:origin-left after:transition-transform hover:after:scale-x-100`}
          >
            Best Deals
          </a>

          <div className="relative group">
            <button className="flex items-center text-[#0D0D0D] font-semibold hover:text-gray-600">
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
        </nav>

        <div className="flex items-center space-x-1 md:space-x-4 lg:space-x-7  text-gray-700">
          <div className="hidden lg:flex  items-center justify-center p-2 rounded-sm">
            <FaSearch className="text-lg md:text-xl hover:text-red-500 cursor-pointer" />
          </div>

          <div className="relative group hidden lg:flex items-center space-x-1">
              <CiUser className="text-xl md:text-3xl" />
              <div className="flex flex-col cursor-pointer">
                <span className="text-[10px] md:text-[14px]">Welcome</span>
                <div className="font-semibold text-[7px] md:text-[14px] flex items-center">
                  Sign in / Register
                  <span className="ml-1">
                    <MdExpandMore className="text-sm group-hover:hidden" />
                    <MdExpandLess className="text-sm hidden group-hover:inline" />
                  </span>
                </div>
              </div>

              {/* Dropdown menu */}
              <div className="absolute z-20 mt-[27.5rem] bg-white shadow-sm rounded-lg border-2 border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 min-w-[240px]">
                {/* Notch (Triangle) */}
                <div className="absolute top-[-6px] left-10 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>

                {/* Top Section */}
                <div className="flex flex-col items-center py-3 border-b">
                  <a href='https://selleradmin.bchoice.store/buyerlogin' className="bg-black text-center text-white font-bold px-6 py-2 rounded-lg w-4/5">
                    Sign in
                  </a>
                  <a 
                  href='https://selleradmin.bchoice.store/buyer signup'
                  className="text-gray-500 mt-2 font-medium">Register</a>
                </div>

                {/* Options List */}
                <div className="py-2">
                  
                  <Link
                    to="/wishlist"
                    className="flex items-center px-5 py-2 text-gray-700 hover:bg-gray-100 border-b"
                  >
                    <span className="mr-2">❤️</span> Wish List
                  </Link>
                  <a
                    href="https://selleradmin.bchoice.store/sellerlogin"
                    className="flex items-center px-5 py-2 text-gray-700  hover:bg-gray-100 border-b"
                    
                  >
                    <span className="mr-2">
                        <img src="/nav-header/seller-icon.png"  className='size-9' alt="" />
                      </span>Seller Login
                  </a>
                  <a
                    href="https://selleradmin.bchoice.store/buyerlogin"
                    className="flex items-center px-5 py-2 text-gray-700 hover:bg-gray-100 border-b"
                    
                  >
                    <span className="mr-2">  <img src="/nav-header/buyer-icon.png"  className='size-9' alt="" /></span> Buyer Login
                  </a>
                  
                </div>

                     {/* Additional Links */}
                  <div className="py-2 border-t">
                    <Link
                      to=""
                      className="block px-5 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      to=""
                      className="block px-5 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Help Center
                    </Link>
                    <Link
                      to=""
                      className="block px-5 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Disputes & Reports
                    </Link>
                  </div>
                </div>
          </div>



          <div className="flex items-center space-x-4 md:space-x-9">
            <Link to={'/cart'} className='flex items-center '>
              <FaShoppingCart className="text-lg md:text-xl hover:text-red-500 cursor-pointer" />
              <div className='flex flex-col items-center'>
                <span className=" bg-red-500 text-white rounded-full text-xs px-1">
                  {cartCount}
                </span>
                <span className="inline">Cart</span>
              </div>
            </Link>
            <button
              onClick={toggleMenu}
              className="lg:hidden text-xl cursor-pointer"
            >
              {isMenuOpen ? (
                <MdClose className="text-2xl" />
              ) : (
                <GiHamburgerMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger Menu - Slide down effect */}
      <div
        className={`lg:hidden absolute top-40 left-0 w-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}
        `}
      >
        <Link
          to="/"
          onClick={() => setActiveLink('Home')}
          className="block px-6 py-4 text-[#0D0D0D] hover:bg-gray-200"
        >
          Home
        </Link>
        <Link
          to="/all-products"
          onClick={() => setActiveLink('All Products')}
          className="block px-6 py-4 text-[#0D0D0D] hover:bg-gray-200"
        >
          All Products
        </Link>
        <button
          onClick={() => {
            setActiveLink('Custom Gift');
            openModal();
          }}
          className="block px-6 py-4 text-[#0D0D0D] hover:bg-gray-200"
        >
          Custom Gift
        </button>
        <a
          href="#bestdeals"
          onClick={() => setActiveLink('Best Deals')}
          className="block px-6 py-4 text-[#0D0D0D] hover:bg-gray-200"
        >
          Best Deals
        </a>
        <Link to={'/login'} className="flex items-center justify-center mx-auto space-x-1  px-6 py-4">
            <CiUser className="text-xl md:text-3xl" />
            <a href="#" className="">
              <div className="flex flex-col">
                <span className="text-[10px] md:text-[14px]">Welcome</span>
                <Link to={'/login'} className="font-semibold text-[7px] hover:text-red-500 flex flex-nowrap shrink-0 md:text-[14px]">
                  Sign in / Register
                </Link>
              </div>
            </a>
          </Link>
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
    </header>
  );
};

export default Header;
