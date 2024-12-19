import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/cartSlice"; // Update the path if necessary
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import Navbar from "../home/homeComponents/NavBar";
import Navbar2 from "../home/homeComponents/NavBar2";
import Footer from "../Footer";

const Cart = () => {
  // Access cart items, custom gift items, and total amount from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const customGiftItems = useSelector((state) => state.cart.giftItems); // Accessing custom gifts
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const deliveryCharge = 45;

  // Function to update quantity and dispatch the action to Redux store
  const updateQuantity = (productId, newQuantity) => {
    const product = cartItems.find((item) => item.id === productId);
    if (!product) return;

    const updatedQuantity = Math.max(1, newQuantity);
    const totalPrice = product.price * updatedQuantity;

    dispatch(
      addItemToCart({
        id: productId,
        quantity: updatedQuantity - product.quantity,
        totalPrice: totalPrice - product.totalPrice,
        price: product.price,
        productName: product.productName,
        productImage: product.productImage,
        deliveryCharge: product.deliveryCharge,
      })
    );
  };

  const removeFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <>
      <Navbar />
      <Navbar2 />
      <div className="py-4 px-4 lg:hidden">
      <nav aria-label="breadcrumb" className="w-max">
        <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
          <li className="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
            <Link to={'/'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
                </Link>
                <span className="pointer-events-none mx-2 text-slate-800">
                  /
                </span>
              </li>
              <li className="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                <Link to={'/cart'}>Cart</Link>
               
              </li>
      </ol>
    </nav>
      </div>

      <section className="md:py-16 py-10 relative">
       
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-[#6a040f]">
            Shopping Cart
          </h2>
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
            <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">

              <span className="w-full max-w-[260px] text-center">Quantity</span>
              <span className="w-full max-w-[200px] text-center">Total</span>
            </p>
          </div>

          {/* Regular Cart Items */}
          {cartItems.map((product) => (
            <>
<div
  key={product.id}
  className="flex flex-col md:flex-row border-t border-gray-200 md:py-2 relative"
>
  {/* Product Info Section */}
  <div className="flex items-center gap-3 md:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
    <div className="img-box">
      <img
        src={product.productImage}
        alt={`${product.productName} image`}
        className="w-[80px] md:w-[100px] shrink-0 rounded-xl object-cover"
      />
    </div>
    <div className="pro-data w-full max-w-sm text-left">
      <h5 className="font-semibold text-xs sm:text-sm md:text-xl md:leading-8 text-black">
        {product.productName.split(" ").slice(0, 8).join(" ")}
        {product.productName.split(" ").length > 8 && "..."}
      </h5>
    </div>
  </div>

  {/* Delete Button on Right */}
  <MdDeleteSweep
    onClick={() => removeFromCart(product.id)}
    className="cursor-pointer text-red-700 text-lg md:text-2xl absolute top-1 right-2 md:top-auto md:right-4"
  />

  {/* Quantity and Total Price Section */}
  <div className="flex  w-full items-center justify-around max-xl:max-w-xl max-xl:mx-auto  gap-4">
    {/* Quantity Controls */}
    <div className="flex items-center gap-2">
      <button
        onClick={() => updateQuantity(product.id, product.quantity - 1)}
        className="rounded-l-full p-2 md:p-3 border border-gray-200 shadow-sm hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <svg
          className="stroke-gray-900 group-hover:stroke-black"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path d="M16.5 11H5.5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <input
        type="text"
        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-10 text-center bg-transparent"
        value={product.quantity}
        onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
      />
      <button
        onClick={() => updateQuantity(product.id, product.quantity + 1)}
        className="rounded-r-full p-2 md:p-3 border border-gray-200 shadow-sm hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
      >
        <svg
          className="stroke-gray-900 group-hover:stroke-black"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path d="M11 5.5V16.5M16.5 11H5.5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>

    {/* Price */}
    <div>
    <h6 className="text-[#f48c06] font-bold text-sm md:text-2xl text-center mt-1 w-full max-w-[176px]">
      RS: {(product.price * product.quantity).toFixed(2)}
    </h6>

    {/* Free Shipping */}
    <h6 className="text-gray-500 text-center w-full font-medium">
      Free Shipping
    </h6>
    </div>
  </div>
</div>


            </>
          ))}
          



          {/* Total Amount */}
          <div className="flex justify-between items-center border-t border-gray-200 pt-6">
            <h6 className="font-bold text-xl leading-8 text-gray-900">Total Amount</h6>
            <h6 className="font-bold text-xl leading-8 text-indigo-600">RS: {totalAmount.toFixed(2)}</h6>
          </div>
        </div>
        {/* two buttons for checkout and continou shoping */}
        <div className="flex justify-center items-center gap-2 md:gap-4">
          <Link
            to={"/"}
            className="px-4 py-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-sm text-white text-sm md:text-lg">
            Continou Shoping
          </Link>
          <Link
            to={"/checkout"}
            className="px-4 py-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-sm text-white text-sm md:text-lg">
            Checkout Out
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
