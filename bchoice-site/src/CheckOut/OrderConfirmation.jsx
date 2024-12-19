import React from 'react';
import { useSelector } from 'react-redux';

const OrderConfirmation = () => {
  const orderData = useSelector((state) => state.orderConfermation);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f0e8] p-4">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Billing Address Section */}
        <div className="flex-1 my-auto items-center bg-white rounded-lg p-6">
          <h1 className="text-4xl font-bold tracking-widest leading-10">Thank you for your purchase!</h1>
          <p className="py-4">Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
          
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Billing Address</h2>
          <ul className="text-gray-700 text-sm mb-4 space-y-2">
            <li><strong>Name:</strong> {orderData.firstName} {orderData.lastName}</li>
            <li><strong>Address:</strong> {orderData.address}, {orderData.city}</li>
            <li><strong>Phone:</strong> {orderData.phone}</li>
            <li><strong>Email:</strong> {orderData.email}</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Track Your Order
          </button>
        </div>

        {/* Order Summary Section */}
        <div className="flex-1 bg-gray-100 rounded-lg p-6 relative overflow-hidden">
          <h2 className="text-xl font-bold mb-4 pb-4 text-black border-b-2">Order Summary</h2>

          {/* Top Row Details */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-around text-gray-700 text-sm border-b-2 mb-4 border-gray-300 pb-4 border-dashed">
            <div>
              <p className="font-semibold">Date</p>
              <p>{new Date(orderData.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Order Number</p>
              <p>{orderData._id}</p>
            </div>
            <div>
              <p className="font-semibold">Payment Method</p>
              <p>{orderData.payment_method}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="py-4">
            {orderData.order_items.map((item) => (
              <div key={item._id} className="flex items-center justify-between mb-4">
                <img src={item.productImage} alt={item.item_name} className="md:w-16 w-10 h-10 md:h-16 rounded-md" />
                <div className="flex-1 ml-2 md:ml-4">
                  <p className="text-xs font-semibold text-gray-800">{item.item_name.split(" ").slice(0, 9).join(" ")}
                  {item.item_name.split(" ").length > 9}...</p>
                  <p className="text-xs md:text-sm text-gray-600">Category: {item.category}</p>
                  <p className="text-xs md:text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="text-gray-800">Rs{item.price}</p>
              </div>
            ))}
          </div>

          {/* Summary Totals */}
          <div className="border-t border-gray-300 pt-4 pb-2">
            <div className="flex justify-between py-1 text-gray-700">
              <span>Sub Total</span>
              <span>Rs{orderData.total_amount }</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700">
              <span>Tax</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 border-t border-gray-300 pt-2 pb-2">
              <span>Order Total</span>
              <span>Rs{orderData.total_amount }</span>
            </div>
          </div>

          {/* Decorative Bottom Edge */}
          <div className="absolute bottom-0 left-0 right-0 h-12">
            <svg viewBox="0 0 200 20" className="w-full h-full mx-auto">
              <path d="M0 20 Q4.17 0 8.33 20 T16.67 20 T25 20 T33.33 20 T41.67 20 T50 20 T58.33 20 T66.67 20 T75 20 T83.33 20 T91.67 20 T100 20 T108.33 20 T116.67 20 T125 20 T133.33 20 T141.67 20 T150 20 T158.33 20 T166.67 20 T175 20 T183.33 20 T191.67 20 T200 20 V20 Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
