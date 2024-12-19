/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useMemo, useCallback } from "react";
import { MdLocalShipping, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../product-card/CollectionCard.css";
import Drawer from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart, updateItemQuantity } from "../../../store/cartSlice";
import Modal from "./Modal";
import { addToWishlist, removeFromWishlist } from "../../../store/wishlistSlice";
import { FaRegCirclePlay } from "react-icons/fa6";
import VideoModal from "../../../hook/VideoModal";

const CollectionCard = ({
  productImage: image,
  hoverImage: hoveredImg,
  discount,
  productName: title,
  rating,
  newPrice,
  oldPrice,
  unitsInStock: isSoldOut,
  shortDescription: product,
  category,
  _id: id,
  reviews,
  videoUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryValu, setcategoryValu] = useState("");

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  // Memoize derived values
  const isInCart = useMemo(() => cartItems.some((item) => item.id === id), [cartItems, id]);
  const cartTotal = useMemo(() => cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2), [cartItems]);
  const isInWishlist = useMemo(() => wishlist.some((item) => item.id === id), [wishlist, id]);
  // const isInWishlist = wishlist;

  // Memoized handlers
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

  const addToCartHandler = useCallback(() => {
    const categoryValu = category === "New Arrival" || category === "Best Seller" ? "New Arrival" : "Custom Gift";

    if (!isInCart) {
      dispatch(
        addItemToCart({
          id,
          productName: title,
          productImage: image,
          quantity: 1,
          price: newPrice,
          totalPrice: newPrice,
          category: categoryValu,
        })
      );
    }

    openDrawer(); // Open Drawer after adding to cart or if already in cart
  }, [isInCart, dispatch, id, title, image, newPrice, category, openDrawer]);

  const addToCartHandler2 = () => {
    const categoryValu = category === "New Arrival" || category === "Best Seller" ? "New Arrival" : "Custom Gift";

    if (!isInCart) {
      dispatch(
        addItemToCart({
          id,
          productName: title,
          productImage: image,
          quantity,
          price: newPrice,
          totalPrice: newPrice * quantity,
          category: categoryValu,
        })
      );
    } else {
      dispatch(
        updateItemQuantity({
          id,
          quantity,
          totalPrice: newPrice * quantity,
        })
      );
    }
    closeModal();
  };

  const toggleWishlistHandler = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(
        addToWishlist({
          id, // Pass the product id
          productName: title,
          productImage: image,
          price: newPrice,
          oldPrice,
          rating,
          reviews,
          category,
        })
      );
    }
  };

  const increaseQuantity = useCallback(
    (item) => {
      dispatch(
        updateItemQuantity({
          id: item.id,
          quantity: item.quantity + 1,
          totalPrice: Number((item.price * (item.quantity + 1)).toFixed(2)), // Ensure totalPrice is a number
        })
      );
    },
    [dispatch]
  );

  const decreaseQuantity = useCallback(
    (item) => {
      if (item.quantity > 1) {
        dispatch(
          updateItemQuantity({
            id: item.id,
            quantity: item.quantity - 1,
            totalPrice: Number((item.price * (item.quantity - 1)).toFixed(2)), // Ensure totalPrice is a number
          })
        );
      }
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (id) => {
      dispatch(removeItemFromCart(id));
    },
    [dispatch]
  );
    // video Modal
    const [isVidoeModalOpen, setIsVideoModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  
    const openVidoeModal = (videoUrl) => {
      setCurrentVideoUrl(videoUrl); // Replace with the actual video URL from your data
      setIsVideoModalOpen(true);
    };
  
    // Function to close the modal
    const closeVidoeModal = () => {
      setIsVideoModalOpen(false);
      setCurrentVideoUrl('');
    }
    console.log("videoUrl",currentVideoUrl);
  return (
    <>
      <div
        className="p-1 rounded-lg shadow-sm mb-2 overflow-hidden bg-white transition-all duration-500 ease-in-out transform hover:scale-105 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-aos-duration="4000">
        <Link to={`/top-collection/${id}`}>
          
          <div className="relative p-1 border-b">
                    <img
                      src={isHovered ? hoveredImg : image}
                      alt={title}
                      className="w-full h-[160px] sm:h-[240px] object-cover rounded-md"
                    />

                    {/* Discount Badge */}
                    {discount && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {discount}% off
                      </span>
                    )}

                    {/* Out of Stock Badge */}
                    {videoUrl.length > 0 && (
                        <span
                          className="absolute top-2 right-2 text-red-500 text-2xl cursor-pointer px-2 py-1 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Prevent card click event
                            openVidoeModal(videoUrl);
                          }}
                        >
                          <FaRegCirclePlay />
                        </span>
                      )}
                  </div>
          <div className=" transition-colors duration-500 ease-in-out border">
            {/* title */}
            <h2 className="mt-2 text-sm sm:text-md font-bold md:px-4 px-3">
              {title.split(" ").slice(0, 9).join(" ")}
              {title.split(" ").length > 9 && "..."}
            </h2>
            <p className="hidden md:flex flex-wrap md:px-4 px-3 text-red-500 ">
                    {product.split(" ").slice(0, 5).join(" ")}
                    {product.split(" ").length > 5 && "..."}
              </p>
              <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 md:px-4 px-3">
                      {[...Array(Math.floor(rating))].map((_, i) => (
                        <i key={i} className="ri-star-fill"></i>
                      ))}
                      {[...Array(5 - Math.floor(rating))].map((_, i) => (
                        <i key={i} className="ri-star-line"></i>
                      ))}
                      <p className="text-black">{`(${rating})`}</p>
                    </div>

                    <MdLocalShipping className="text-yellow-400 mt-[2px] mr-1 hidden lg:block" />
                    <p className="text-black text-sm hidden lg:block">Free Shipping</p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 md:px-4 px-3">
                    <span className="md:text-xl text-sm shrink-0 font-bold tracking-wider">PKR {newPrice}</span>
                    <span className="line-through text-xs shrink-0 text-red-500">Rs{oldPrice}</span>
                  </div>
                  <div className="md:px-4 px-3 pb-2">
                    <p className="text-black font-bold mt-1 text-sm border-red-500 border px-3 inline">
                      Save Rs:{oldPrice - newPrice}
                    </p>
                  </div>
          </div>
        </Link>

        {isHovered && (
          <div className="absolute inset-0 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 justify-center bg-opacity-50 text-white transition-all duration-500 ease-in-out mb-16 z-10 pointer-events-none">
            <div className="flex gap-8 text-black transition-all duration-1000 pointer-events-auto z-20 rounded-md bg-white px-2 py-3 cursor-pointer">
              <MdOutlineRemoveRedEye onClick={openModal} className="size-4" />
              <FaCartPlus onClick={addToCartHandler} className="size-4" />
              {/* <FaRegHeart className={`size-4 ${isInWishlist ? "text-red-500" : ""}`} onClick={toggleWishlistHandler} /> */}
              {/* <FaRegHeart className="size-4" onClick={toggleWishlistHandler} /> */}
              <FaHeart
                className={`size-4 cursor-pointer ${isInWishlist ? "text-red-500" : "text-black"}`}
                onClick={toggleWishlistHandler}
              />
            </div>
          </div>
        )}

        {/* Drawer Section */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          content={
            cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-1">
                    <div className="flex gap-4">
                      <div className="p-1 bg-gray-200 rounded-md">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-md border shrink-0"
                        />
                      </div>
                      <div>
                      <p className="font-semibold">
                        {item.productName.split(" ").slice(0, 2).join(" ")}
                        {item.productName.split(" ").length > 2 && "..."}
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
                        onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">Total: Rs{cartTotal}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <button onClick={closeDrawer} className="bg-red-500 text-white py-2 px-4 rounded">
                    Continue Shopping
                  </button>
                  <Link to={"/cart"} className="bg-red-500 text-white py-2 px-4 rounded">
                    Cart
                  </Link>
                </div>
              </div>
            )
          }
        />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Product Added to Cart"
          imageSrc={image}
          content={
            <div>
              <p className="text-lg font-semibold">{title}</p>
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
      </div>
      <VideoModal  isVidoeModalOpen={isVidoeModalOpen} videoUrl={currentVideoUrl} closeVidoeModal={closeVidoeModal} />
    </>
  );
};

export default CollectionCard;
