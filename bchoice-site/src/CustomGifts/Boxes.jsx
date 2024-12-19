import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart, setSelectedProduct } from "../store/cartSlice";
import Navbar from "../pages/home/homeComponents/NavBar";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import { Link } from "react-router-dom";
import Footer from "../pages/Footer";
import toast from "react-hot-toast";
import { fetchProduct } from "../store/giftSlice.js";

const Boxes = () => {
  const [filterType, setFilterType] = useState("all");
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const selectedProductId = useSelector((state) => state.cart.selectedProductId);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  // const items = useSelector((state) => state.cart.cartItems);
  // console.log(items);

  const products = useSelector((state) => state.gift.items);
  const status = useSelector((state) => state.gift.status);
  const error = useSelector((state) => state.gift.error);

  useEffect(() => {
    if (status === "idle" && products.length === 0) {
      dispatch(fetchProduct({ category: "Box" }));
    }
  }, [status, dispatch, products.length]);

  const filteredProducts = useMemo(() => {
    if (filterType === "all") return products;
    return products.filter((product) => product.type === filterType);
  }, [filterType, products]);

  const selectedProduct = useMemo(() => {
    return products.find((product) => product._id === selectedProductId);
  }, [selectedProductId, products]);

  const handleSelect = (product) => {
    if (selectedProduct?._id === product._id) {
      dispatch(setSelectedProduct(null));
      dispatch(removeItemFromCart(product._id));
    } else {
      dispatch(setSelectedProduct(product._id));
      dispatch(
        addItemToCart({
          id: product._id,
          productName: product.productName,
          productImage: product.productImage,
          quantity: 1,
          price: product.newPrice,
          totalPrice: product.oldPrice,
          isCustom: true,
          category: "Custom Gift",
        })
      );
    }
    showNotification(`${product.productName} selected`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const formatPrice = useCallback((price) => `Rs ${price.toFixed(2)}`, []);

  return (
    <div className="overscroll-auto">
      {/* <Navbar /> */}
      <Navbar2 />
      <div className="container mx-auto md:p-4 overscroll-x-none max-w-[90rem]">
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
            {notification}
          </div>
        )}
        <div className="flex flex-col md:flex-row p-4 justify-between items-center py-6 md:py-8">
          <div>
            <p className="text-2xl font-bold md:text-4xl text-gray-800 mb-4 md:mb-0">Select The Box For Your Gift</p>
            <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-0 mt-3">
              Choose from our wide variety of customizable 3D LED lamps.
              <Link
                to={"/boxes/custom-gift"}
                className="text-blue-600 hover:text-blue-800 transition underline duration-300">
                don't need box
              </Link>
            </p>
          </div>
        </div>
        <div className="flex md:space-x-4 space-x-2 p-3 overflow-x-scroll md:overflow-x-hidden scrollbar-hide">
          {["all", "paper", "wooden", "cardboard"].map((type) => (
            <button
              key={type}
              className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold rounded-md shadow-md transition duration-300"
              onClick={() => setFilterType(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Scrollable Product Section */}
        <div className="h-[600px] overflow-y-auto overscroll-x-none scrollbar-hide md:p-4 border mb-10 bg-gray-50 rounded-md max-w-[1550px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`min-w-[180px] bg-white border rounded-lg p-1 shadow-md transform transition-all duration-300 ${
                  selectedProduct?.id === product._id
                    ? "scale-105 shadow-lg bg-green-100"
                    : "hover:scale-105 hover:shadow-lg"
                }`}>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-[200px] object-cover border-b rounded-md"
                />
                <h2 className="mt-2 text-md font-semibold pl-3">{product.productName}</h2>
                <div className="flex items-center justify-between mt-1 px-3 text-red-500 font-bold text-sm">
                  <span className="line-through">{formatPrice(product.newPrice)}</span>
                  <span>{formatPrice(product.oldPrice)}</span>
                </div>
                <p className="text-green-600 mt-1 text-xs pl-3">{product.oldPrice - product.newPrice}</p>
                <button
                  onClick={() => handleSelect(product)}
                  className={`w-full mt-2 py-1 text-white font-bold text-sm rounded transition-colors duration-300 ${
                    selectedProduct?._id === product._id ? "bg-green-600" : "bg-red-500"
                  }`}>
                  {selectedProduct?._id === product._id ? "Selected" : "Select"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 shadow-lg flex justify-center items-center  gap-6 px-8">
          {/* <button
            onClick={() => sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-md">
            Previous
          </button> */}
          {/* totalAmount */}

          <Link
            to="/boxes/custom-gift"
            className="px-3 py-1 bg-gradient-to-r from-green-400 to-red-400 text-white rounded-md">
            Next
          </Link>

          {/* <button
            onClick={() => sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
            className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-md">
            Next
          </button> */}

          <p className="text-md text-black font-bold">Total Amount: {formatPrice(totalAmount)}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Boxes;
