/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar2 from "../pages/home/homeComponents/NavBar2";
import Footer from "../pages/Footer";
import toast from "react-hot-toast";
import { resetCart } from "./../store/cartSlice.js";
import { useNavigate, useNavigation } from "react-router-dom";
import { saveOrderData } from "../store/checkout/orderConfermation.js";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigation = useNavigate()

  const [email, SetEmailOrNumber] = useState("");
  const [firstName, SetfirstName] = useState("");
  const [lastName, SetlastName] = useState("");
  const [address, Setaddress] = useState("");
  const [city, Setcity] = useState("");
  const [postalCode, SetpostlCode] = useState("");
  const [phone, Setphone] = useState("");
  const [shipping_method, Setshipping_method] = useState("Trax");
  const [payment_method, Setpayment] = useState("Cash on Delivery (COD)");
  const [shipping_cost, Setshipping_cost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for input validation errors
  const [errors, setErrors] = useState({});

  const placeOrder = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validation for empty fields
    const newErrors = {};
    if (!email) newErrors.email = true;
    if (!firstName) newErrors.firstName = true;
    if (!lastName) newErrors.lastName = true;
    if (!address) newErrors.address = true;
    if (!city) newErrors.city = true;
    if (!postalCode) newErrors.postalCode = true;
    if (!phone) newErrors.phone = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    const order_items = [...cartItems].map((item) => ({
      item_name: item.productName,
      quantity: item.quantity,
      price: item.totalPrice,
      productImage: item.productImage,
      category: item.category,
    }));

    const total_amount = [...cartItems].reduce((acc, item) => acc + item.totalPrice, 0);

    const orderData = {
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phone,
      order_items,
      total_amount,
      payment_method,
      shipping_method,
      shipping_cost,
    };
// console.log(orderData);
    try {
      setIsSubmitting(true);
      const res = await fetch(`${import.meta.env.VITE_KEY}/client/confiremOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.error);
        toast.error("Error placing order: ");
        return;
      } else {
        SetEmailOrNumber("");
        SetfirstName("");
        SetlastName("");
        Setaddress("");
        Setcity("");
        SetpostlCode("");
        Setphone("");
        Setshipping_method("Trax");
        Setpayment("Cash on Delivery (COD)");
        dispatch(resetCart());
        toast.success("Order placed successfully!");
        dispatch(saveOrderData(data));
        navigation("/order/order confermed")
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div className="w-full max-w-4xl bg-white shadow-lg p-8">
          {/* <h1 className="text-2xl font-semibold text-center mb-6">BCoice</h1> */}
          <img src="/logo.png" alt="" className="w-48  flex justify-center items-center mx-auto" />
          <div className="flex flex-col lg:flex-row gap-8">
            {/* First Section: Contact, Delivery, Shipping, Payment */}
            <div className="flex-1 w-full lg:w-1/2 space-y-6">
              <div>
                <h2 className="font-semibold mb-2">Contact</h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => SetEmailOrNumber(e.target.value)}
                  placeholder="Email or mobile phone number"
                  className={`w-full p-2 border ${
                    errors.email ? "border-red-500 border-2" : "border-gray-300"
                  } rounded`}
                  required
                />
              </div>
              <div>
                <h2 className="font-semibold mb-2">Delivery</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => SetfirstName(e.target.value)}
                    className={`p-2 border ${
                      errors.firstName ? "border-red-500 border-2 " : "border-gray-300"
                    } rounded`}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => SetlastName(e.target.value)}
                    className={`p-2 border ${errors.lastName ? "border-red-500 border-2" : "border-gray-300"} rounded`}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => Setaddress(e.target.value)}
                  className={`w-full mt-4 p-2 border ${
                    errors.address ? "border-red-500 border-2" : "border-gray-300"
                  } rounded`}
                  required
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => Setcity(e.target.value)}
                    placeholder="City"
                    className={`p-2 border ${errors.city ? "border-red-500 border-2" : "border-gray-300"} rounded`}
                    required
                  />
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => SetpostlCode(e.target.value)}
                    placeholder="Postal code (optional)"
                    className={`p-2 border ${
                      errors.postalCode ? "border-red-500 border-2" : "border-gray-300"
                    } rounded`}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => Setphone(e.target.value)}
                  className={`w-full mt-4 p-2 border ${
                    errors.phone ? "border-red-500 border-2" : "border-gray-300"
                  } rounded`}
                  required
                />
              </div>

              <div>
                <h2 className="font-semibold mb-2">Shipping method</h2>
                <div className="space-y-2">
                  <label className="block">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping_method === "Trax"}
                      onChange={() => Setshipping_method("Trax")}
                      className="mr-2"
                    />
                    Trax (Free Shipping)
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping_method === "TCS"}
                      onChange={() => Setshipping_method("TCS")}
                      className="mr-2"
                    />
                    TCS (Free Shipping)
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping_method === "LEOPARDS"}
                      onChange={() => Setshipping_method("LEOPARDS")}
                      className="mr-2"
                    />
                    LEOPARDS (Free Shipping)
                  </label>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Payment</h2>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={payment_method}
                  onChange={(e) => Setpayment(e.target.value)}>
                  <option>Cash on Delivery (COD)</option>
                  <option>Jazz Cash (+92 3045692054)</option>
                  <option>Easy Paisa (+92 3045692054)</option>
                </select>
              </div>
            </div>

            {/* Second Section: Cart Summary */}
            <div className="flex-2 w-full lg:w-1/2  space-y-6 mt-3">
              <div className="bg-gray-50  md:p-4 max-h-[500px] h-auto overflow-y-scroll border border-gray-200 rounded">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.productName} className="flex justify-between mb-4 border-b-2 pb-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <img src={item.productImage} className="md:w-28 w-16 rounded-sm" alt="" />

                          <div>
                            <h3 className="font-semibold text-sm md:text-lg">
                              {item.productName.split(" ").slice(0, 4).join(" ")}
                              {item.productName.split(" ").length > 4}...
                            </h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                      <p>Rs{item.totalPrice}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items in cart</p>
                )}
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded">
                <div className="flex justify-between">
                  <p className="font-semibold">Total Amount:</p>
                  <p>Rs{totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={placeOrder}
                  className={`w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}>
                  {isSubmitting ? "Placing order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
