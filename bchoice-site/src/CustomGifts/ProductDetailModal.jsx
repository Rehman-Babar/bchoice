/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { MdLocalShipping } from "react-icons/md";
import ProductDetailsTabs from "../TopProductCollection/Description";
// import { useSelector } from "react-redux";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlinePhoneCallback } from "react-icons/md";

const ProductModal = ({ isOpen, product, onClose, handleSelect, selectedProducts }) => {
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const [selectedProducts, setSelectedProducts] = useState(new Set(cartItems.map((item) => item.id)));
  const [selectedImage, setSelectedImage] = useState(null);
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    if (product) {
      // Initialize imagesArray only if product is defined
      const imagesArray = [
        { src: product.productImage }, // Add the primary product image
        { src: product.hoverImage }, // Add the hover image
        ...product.productImages.map((img) => ({ src: img })), // Add any other images from productImages
      ];
      setProductImage(imagesArray);
      setSelectedImage({ src: product.productImage }); // Set main image initially
    }
  }, [product]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative m-4 mt-[44rem] md:mt-52">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &#x2715;
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side: Main Image */}
          <div className="w-full md:w-1/2  items-center">
            <img
              src={selectedImage?.src}
              alt={product.productName}
              className="rounded-lg shadow-md max-h-[400px] text-center mx-auto object-cover mb-4"
            />
            <div className="flex mt-4 gap-2 justify-center md:justify-start flex-wrap md:flex-nowrap pb-2 border-b mb-2">
              {productImage.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={`Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover cursor-pointer border-2  rounded-md ${
                    selectedImage?.src === image.src ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4 md:mb-16">
            <h2 className="text-lg font-bold">{product.productName}</h2>
            <p className=" mt-2">{product.shortDescription}</p>
            <div className="flex items-center mt-1">
              <div className="flex text-yellow-400">
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
            <div className="flex items-center gap-1 mt-3">
              <p className="text-yellow-600 font-bold text-2xl ">PKR {product.newPrice}</p>
              {product.oldPrice && <p className="line-through text-red-500 text-sm">PKR {product.oldPrice}</p>}
            </div>
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
            <div className="mt-3 space-y-1">
              <p>For Any Customization</p>
              <div className="flex items-center gap-2">
              <FaWhatsapp className="text-[#48C255] size-8"/>
              <span> +92 304 5692054</span>
              </div>
              <div className="flex items-center gap-2">
              <MdOutlinePhoneCallback className="text-red-500 size-8"/>
              <span> +92 304 975692054</span>
              </div>
            </div>
          </div>
        </div>

        <ProductDetailsTabs product={product} />
      </div>
    </div>
  );
};

export default ProductModal;
