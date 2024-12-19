import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/cartSlice";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import { Link } from "react-router-dom";
import Footer from "../pages/Footer";
// import { fetchProduct } from "../store/giftSlice";
// import { fetchGiftProduct } from "../store/giftSliceForProducts";
import { fetchCatagory3 } from "../store/catagores/catagory3";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "../hook/Loader";
import { MdLocalShipping } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import CrdsSkeltons from "../hook/CrdsSkeltons";
import ProductModal from "./ProductDetailModal";
import VideoModal from "../hook/VideoModal";

const Catagory3 = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedProducts, setSelectedProducts] = useState(new Set(cartItems.map((item) => item.id)));
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const sliderRef = useRef(null);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterType, setFilterType] = useState(""); // State for filter type
  const dispatch = useDispatch();

  const products = useSelector((state) => state.catagory3.items);
  const status = useSelector((state) => state.catagory3.status);
  useEffect(() => {
    if (status === "idle" && products.length === 0) {
      dispatch(fetchCatagory3({ category: "Chocolates And Eating" }));
    }
  }, [status, dispatch, products.length]);
  // Handle product selection and add/remove from Redux cart
  const handleSelect = (product) => {
    const isInCart = selectedProducts.has(product._id);

    if (!isInCart) {
      dispatch(
        addItemToCart({
          id: product._id,
          productName: product.productName,
          productImage: product.productImage,
          quantity: 1, // Default quantity to 1
          price: product.newPrice,
          totalPrice: product.newPrice,
          isCustom: true,
          category: "Custom Gift",
        })
      );
      setSelectedProducts(new Set([...selectedProducts, product._id]));
      showNotification(`${product.productName.split(" ").slice(0, 2).join(" ")} added to cart`);
    } else {
      selectedProducts.delete(product._id);
      setSelectedProducts(new Set(selectedProducts)); // Set needs to be copied for re-render
      dispatch(removeItemFromCart(product._id));
      showNotification(`${product.productName.split(" ").slice(0, 2).join(" ")} remove from cart`);
    }
  };

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notification disappears after 3 seconds
  };

  // Format price display function
  const formatPrice = (price) => `Rs ${price.toFixed(2)}`;

  let filteredProducts = Array.isArray(products)
    ? products.filter((product) => (filterType ? product.type === filterType : true))
    : [];

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

    // video Modal
    const [isVidoeModalOpen, setIsVideoModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  
    const openVidoeModal = (product) => {
      setCurrentVideoUrl(product.videoUrl); // Replace with the actual video URL from your data
      setIsVideoModalOpen(true);
    };
  
    // Function to close the modal
    const closeVidoeModal = () => {
      setIsVideoModalOpen(false);
      setCurrentVideoUrl('');
    }

  return (
    <>
      <Navbar />
      <Navbar2 />
      <div className="container mx-auto md:p-4 max-w-[90rem]">
        <div className="flex flex-col lg:flex-row md:justify-between">
          <div className="max-w-xl xl:max-w-4xl p-4 md:p-0">
            <h1 className="text-xl md:text-4xl  font-bold  mb-1 mt-6">Chocolate Box & Eatings:</h1>
            <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6 ">
              Select a customized box of chocolates, and you can also choose your favorite Eating items.
            </p>
          </div>
        </div>
        <div>
          <div className="flex md:space-x-4 pl-1 space-x-2 pb-2 overflow-x-scroll md:overflow-x-hidden scrollbar-hide shrink-0 flex-nowrap">
            <button
              onClick={() => setFilterType("")}
              className="md:min-w-[120px] min-w-[90px] px-2 py-1 md:text-sm text-xs bg-gray-500 text-white rounded-sm">
              All
            </button>
            <button
              onClick={() => setFilterType("Gift Box")}
              className="md:min-w-[120px] min-w-[90px] px-2 py-1 md:text-sm text-xs bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-sm">
              Gift Box
            </button>
            <button
              onClick={() => setFilterType("Eating")}
              className="md:min-w-[120px] min-w-[90px] px-2 py-1 md:text-sm text-xs bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-sm">
              Eatings
            </button>
          </div>

          {/* Sort Buttons */}
          {/* <div className="md:flex justify-center space-x-4 mb-4 hidden "></div> */}
        </div>

        {/* Filter Buttons */}

        {/* Notification */}
        {notification && (
          <div className="fixed top-10 right-4 bg-green-500 text-white py-2 px-4 rounded-sm shadow-lg z-50">
            {notification}
          </div>
        )}

        {/* Products list */}

        <div className="h-[600px] overflow-y-auto overscroll-x-none scrollbar-hide p-2 md:p-4 border mb-10 bg-gray-50 rounded-md max-w-[1550px]">
          {status === "loading" ? (
            // Display skeleton loader during loading
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <CrdsSkeltons key={index} />
                ))}
            </div>
          ) : filteredProducts?.length === 0 ? (
            // Display "no products available" message if no products
            <div className="text-center p-4">
              <p className="text-lg font-bold text-red-500">No products available at the moment.</p>
            </div>
          ) : (
            // Display product grid if products are available
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 cursor-pointer">
              {filteredProducts?.map((product) => (
                <div
                  onClick={() => openModal(product)}
                  key={product._id}
                  className={`min-w-[150px] sm:min-w-[180px] bg-white border rounded-lg shadow-md transform transition-all duration-300`}>
                  <div className="relative p-1 border-b">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-full h-[160px] sm:h-[240px] object-cover rounded-md"
                    />

                    {/* Discount Badge */}
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.discount}% off
                      </span>
                    )}

                    {/* Out of Stock Badge */}
                    {product.videoUrl.length > 0 && (
                        <span
                          className="absolute top-2 right-2 text-red-500 text-2xl cursor-pointer px-2 py-1 rounded"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            openVidoeModal(product);
                          }}
                        >
                          <FaRegCirclePlay />
                        </span>
                      )}
                  </div>

                  <h2 className="mt-2 text-sm sm:text-md font-bold md:px-4 px-3">
                    {product.productName.split(" ").slice(0, 9).join(" ")}
                    {product.productName.split(" ").length > 9 && "..."}
                  </h2>
                  <p className="hidden md:flex flex-wrap md:px-4 px-3 text-red-500 ">
                    {product.shortDescription.split(" ").slice(0, 5).join(" ")}
                    {product.shortDescription.split(" ").length > 5 && "..."}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 md:px-4 px-3">
                      {[...Array(Math.floor(product.rating))].map((_, i) => (
                        <i key={i} className="ri-star-fill"></i>
                      ))}
                      {[...Array(5 - Math.floor(product.rating))].map((_, i) => (
                        <i key={i} className="ri-star-line"></i>
                      ))}
                      <p className="text-black">{`(${product.rating})`}</p>
                    </div>

                    <MdLocalShipping className="text-yellow-400 mt-[2px] mr-1 hidden lg:block" />
                    <p className="text-black text-sm hidden lg:block">Free Shipping</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:px-4 px-3">
                    <span className="md:text-xl text-sm shrink-0 font-bold tracking-wider">PKR {product.newPrice}</span>
                    <span className="line-through text-xs shrink-0 text-red-500">{formatPrice(product.oldPrice)}</span>
                  </div>
                  <div className="md:px-4 px-3">
                    <p className="text-black font-bold mt-1 text-sm border-red-500 border px-3 inline">
                      Save Rs:{product.oldPrice - product.newPrice}
                    </p>
                  </div>

                  <div className="p-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents modal from opening when clicking the button
                        handleSelect(product);
                      }}
                      className={`w-full mt-2 py-1 text-white font-bold text-xs sm:text-sm rounded transition-colors duration-300 ${
                        selectedProducts.has(product._id) ? "bg-green-600" : "bg-red-500"
                      }`}>
                      {selectedProducts.has(product._id) ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 shadow-lg flex justify-center items-center md:gap-6 gap-4 px-8">
          {/* Previous Button */}
          <Link
            to={"/jewellery"}
            onClick={() => sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className="md:px-6 md:py-3 px-3 py-2 flex items-center text-black border-2 rounded-sm transition-all duration-300 ">
            <IoIosArrowBack />
            Previous
          </Link>

          {/* Skip Button */}
          <Link to="/tech" className="md:px-6 md:py-3 px-3 py-2 text-black border-2 rounded-sm transition-all duration-300 ">
            Skip
          </Link>

          {/* Next Button */}
          <Link
            to={"/tech"}
            className="md:px-6 md:py-3 px-3 py-2 flex items-center text-black border-2 rounded-sm transition-all duration-300 ">
            Next
            <IoIosArrowForward />
          </Link>
          <p className="text-md text-black font-bold hidden md:block">Total Amount: Rs {totalAmount}</p>
        </div>

        {/* Total Amount */}
      </div>
      <Footer />
      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
        handleSelect={handleSelect}
        selectedProducts={selectedProducts}
      />
              <VideoModal isVidoeModalOpen={isVidoeModalOpen} videoUrl={currentVideoUrl} closeVidoeModal={closeVidoeModal} />
    </>
  );
};

export default Catagory3;
