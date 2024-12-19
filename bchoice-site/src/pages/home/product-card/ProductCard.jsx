/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, updateItemQuantity, removeItemFromCart } from "../../../store/cartSlice"; // Use updateItemQuantity
import { addToWishlist, removeFromWishlist } from "../../../store/wishlistSlice";
import { MdLocalShipping, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import Drawer from "./Drawer"; // Import Drawer componentb
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { FaRegCirclePlay } from "react-icons/fa6";

const ProductCard = ({
  _id: id,
  productImage,
  hoverImage,
  discount,
  productName,
  rating,
  reviews,
  newPrice,
  oldPrice,
  unitsInStock,
  category,
  shortDescription,
  status,
  openVideoModal,
  videoUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for Drawer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Quantity state for modal
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux store
  const isInWishlist = wishlist.some((item) => item.id === id);
  // console.log(shortDescription)
  // const [ratings, setrating] = useState(rating);

  

  const openDrawer = () => setIsDrawerOpen(true); // Open Drawer
  const closeDrawer = () => setIsDrawerOpen(false); // Close Drawer

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

  // Check if item is in the cart
  const isInCart = cartItems.some((item) => item.id === id);

  const addToCartHandler = () => {
    if (!isInCart) {
      dispatch(
        addItemToCart({
          id,
          productName,
          productImage,
          quantity: 1, // Default quantity to 1
          price: newPrice,
          totalPrice: newPrice,
          category:"New Arrival"
        })
      );
      openDrawer(); // Open Drawer after adding to cart
    } else {
      openDrawer(); // If already in cart, just open the drawer
    }
  };

  const addToCartHandler2 = () => {
    if (!isInCart) {
      dispatch(
        addItemToCart({
          id,
          productName,
          productImage,
          quantity,
          price: newPrice,
          totalPrice: newPrice * quantity,
          category:"New Arrival"
        })
      );
    } else {
      // If already in cart, just update the quantity
      dispatch(updateItemQuantity({
        id,
        quantity,
        totalPrice: newPrice * quantity,
      }));
    }
    closeModal();
  };

  const toggleWishlistHandler = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(
        addToWishlist({
          id,
          productName,
          productImage,
          price: newPrice,
          oldPrice: oldPrice,
          rating,
          reviews,
          category: "Tech",
        })
      );
    }
  };

  const increaseQuantity = (item) => {
    dispatch(
      updateItemQuantity({
        id: item.id,
        quantity: item.quantity + 1, // Increment by 1
        totalPrice: (item.quantity + 1) * item.price,
      })
    );
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateItemQuantity({
          id: item.id,
          quantity: item.quantity - 1, // Decrement by 1
          totalPrice: (item.quantity - 1) * item.price,
        })
      );
    }
  };

  const removeFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };
  console.log(rating)

  return (
    <>    
      <Link to={`/top-collection/${id}`} className="block">
      <div
          className="min-w-[150px] sm:min-w-[220px] cursor-pointer rounded-lg md:border md:shadow-md transform transition-all duration-300 hover:scale-105 relative mb-4 border bg-white h-[330px] sm:h-auto"  // <-- Set fixed height here
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
                        <div className="relative p-1 border-b">
                          <img
                            src={isHovered ? hoverImage : productImage}
                            alt={productName}
                            className="w-full h-[160px] sm:h-[260px] object-cover rounded-sm"
                          />

                          {/* Discount Badge */}
                          {discount && (
                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                              {discount}% off
                            </span>
                          )}

                              {videoUrl.length > 0 && (
                                <span
                                  className="absolute top-2 z-40 right-2 text-red-500 text-2xl cursor-pointer px-2 py-1 rounded"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openVideoModal(videoUrl); // Trigger modal in ProductList
                                  }}
                                >
                                  <FaRegCirclePlay />
                                </span>
                              )}
                            </div>

          {/* Product Info */}
          <div className="pb-3" >
            <h2 className="mt-2 text-sm sm:text-md font-bold md:px-4 px-3">
              {productName.split(" ").slice(0, 8).join(" ")}
              {productName.split(" ").length > 8 && "..."}
            </h2>
            <p className="hidden md:flex flex-wrap md:px-4 px-3 text-red-500 ">
              {shortDescription.split(" ").slice(0, 5).join(" ")}
              {shortDescription.split(" ").length > 5 && "..."}
            </p>
            <div className="flex items-center mt-1">
            <div className="flex text-yellow-400 md:px-4 px-3">
  {[...Array(Math.floor(rating))].map((_, i) => (
    <i key={i} className="ri-star-fill"></i>
  ))}
  {[...Array(5 - Math.floor(rating))].map((_, i) => (
    <i key={i + Math.floor(rating)} className="ri-star-line"></i>
  ))}
  <p id="catagory" className="text-black ml-2">{`(${rating})`}</p>
</div>


              <MdLocalShipping className="text-yellow-400 mt-[2px] mr-1 hidden xl:block" />
              <p className="text-black text-sm hidden xl:block">Free Shipping</p>
            </div>

            {/* Prices */}
            <div className="flex items-center gap-2 mt-2 md:px-4 px-3">
              <span className="md:text-xl text-sm shrink-0 font-bold tracking-wider">PKR {newPrice}</span>
              <span className="line-through text-xs shrink-0 text-red-500">{oldPrice}</span>
            </div>
            <div className="md:px-4 px-3">
              <p className="text-black font-bold mt-1 text-sm border-red-500 border px-3 inline">
                Save Rs:{oldPrice - newPrice}
              </p>
            </div>
          </div>

          {/* Hover Actions */}
          {isHovered && (
            <div className="absolute inset-0 flex gap-2 items-center justify-center bg-black/10 text-white transition-all duration-500 ease-in-out">
              <MdOutlineRemoveRedEye
                className="size-6 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
              />
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  addToCartHandler();
                }}
              >
                Add To Cart
              </button>
              <div className="hidden md:block" >
                <FaHeart
                  className={`size-6 cursor-pointer ${isInWishlist ? "text-red-500" : "text-white"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlistHandler();
                  }}
                />
              </div>
            </div>
          )}
        </div>

      </Link>

      {/* Drawer Component */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        content={
          <div>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                
                  <div key={item.id} className="flex justify-between items-center pb-1">
                    <div className="flex gap-4 shrink-0">
                      <div className="p-1 bg-gray-200 rounded-md">
                        <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover flex-shrink-0 rounded-md border" />
                      </div>
                      <div>
                        <p className="font-semibold">
                        {item.productName.split(" ").slice(0, 3).join(" ")}
                        {item.productName.split(" ").length > 3 && "..."}
                        </p>
                        
                        <p className="text-gray-500">Price: Rs{item.price}</p>
                        <div className="flex items-center">
                          <button
                            className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"
                            onClick={() => decreaseQuantity(item)}>
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"
                            onClick={() => increaseQuantity(item)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between flex-col p-2 border-b mb-3">
                  <div className="font-bold">Rs{item.totalPrice.toFixed(2)}</div>
                    <button
                      className="text-red-500 underline hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  </div>
                  
                  
                ))}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">Total: Rs{cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}</span>
                  
                </div>
                <div className="flex justify-between gap-2" >
                <button onClick={closeDrawer} className="bg-red-500 text-white py-2 px-4 rounded">Continou Shoping</button>
                <Link to={'/cart'} className="bg-red-500 text-white py-2 px-4 rounded">Cart</Link>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Product Added to Cart"
        imageSrc={productImage}
        content={
          <div>
            <p className="text-lg font-semibold">{productName}</p>
            <p className="text-gray-500">{newPrice}</p>
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
          <div className="flex  flex-col ">
            <span className="text-sm font-bold mb-4">Total: Rs{(parseFloat(newPrice) * quantity).toFixed(2)}</span>
            <button className="bg-red-500 text-white py-1 px-3 rounded" onClick={addToCartHandler2}>
              Add To Cart
            </button>
          </div>
        }
      />
    </>
  );
};

export default ProductCard;
