import React, { useState } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../store/cartSlice";
import Modal from "../pages/home/product-card/Modal";

const NewProductCards = ({ brand, image, price, oldPrice, name, bgColor, id, rating, category }) => {
  // console.log(category);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const isInWishlist = wishlist.some((item) => item.id === id);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        id,
        productName: name,
        productImage: image,
        quantity,
        price: price,
        totalPrice: price * quantity,
        category: "New Arrival",
      })
    );
    closeModal();
  };

  return (
    <>
      <div
        className="w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative px-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div style={{ backgroundColor: bgColor }} className="rounded-t-xl p-5 h-80 relative">
          <img src={image} alt={name} className="h-full w-full object-bottom rounded-xl" />
          {isHovered && (
            <div className="absolute inset-0 flex flex-col items-center space-y-3 justify-center bg-black bg-opacity-50 text-white transition-all duration-300 ease-in-out z-50 rounded-xl">
              {/* Buttons and icons that will show on hover */}
              <button className="bg-white text-black py-2 px-4 rounded" onClick={openModal}>
                Add To Cart
              </button>
              <div className="flex gap-4 text-white transition-all duration-300 pointer-events-none opacity-50">
                <MdOutlineRemoveRedEye className="w-6 h-6 hover:scale-110" />
                <FaCartPlus className="w-6 h-6 hover:scale-110" />
                <FaHeart className={`w-6 h-6 hover:scale-110 ${isInWishlist ? "fill-red-500" : "text-white"}`} />
                {/* <IoMdGitCompare className="w-6 h-6 hover:scale-110" /> */}
              </div>
            </div>
          )}
        </div>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
          <p className="text-lg font-bold text-black truncate block capitalize">{name}</p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">Rs: {price}</p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">Rs: {oldPrice}</p>
            </del>
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus cursor-pointer"
                viewBox="0 0 16 16"
                onClick={openModal}>
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        description="Lorem ipsum dolor, sit amet consectetur ue, quasi ullam, impedit officiis soluta nobis."
        imageSrc={image}
        content={
          <div>
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-gray-500">Rs: {price}</p>
            <div className="flex items-center mt-1">
              <div className="flex text-yellow-400">
                {[...Array(Math.floor(rating))]?.map((_, i) => (
                  <i key={i} className="ri-star-fill"></i>
                ))}
                {[...Array(5 - Math.floor(rating))]?.map((_, i) => (
                  <i key={i} className="ri-star-line"></i>
                ))}
              </div>
              {/* <span className="text-xs text-gray-700 ml-2">({reviews})</span> */}
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 border rounded p-1 text-center"
                min="1"
              />
            </div>
          </div>
        }
        footer={
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total: Rs{(parseFloat(price) * quantity).toFixed(2)}</span>
            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={addToCartHandler}>
              Add To Cart
            </button>
          </div>
        }
      />
    </>
  );
};

export default NewProductCards;
