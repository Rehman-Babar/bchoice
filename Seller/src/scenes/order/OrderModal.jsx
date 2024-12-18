import React from "react";
import { ImCross } from "react-icons/im";
const OrderModal = ({ productData, closeModal }) => {
  // Ensure productData is available
  if (!productData) return null;


  // Destructure productData for easier access
  const {
    email,
    firstName,
    lastName,
    address,
    city,
    postalCode,
    phone,
    shipping_method,
    payment_method,
    order_items,
    total_amount,
  } = productData;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl overflow-auto h-4/5 shadow-lg">
      <div className="flex justify-end">
            <button onClick={closeModal} className="px-4 py-2 hover:text-red-600">
              <ImCross/>
            </button>
          </div>
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">Checkout Summary</h2>
        
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg text-black">Contact Information:</h3>
            <p className="text-gray-700"><strong>Email:</strong> {email}</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg text-black">Delivery Information:</h3>
            <p className="text-gray-700"><strong>First Name:</strong> {firstName}</p>
            <p className="text-gray-700"><strong>Last Name:</strong> {lastName}</p>
            <p className="text-gray-700"><strong>Address:</strong> {address}</p>
            <p className="text-gray-700"><strong>City:</strong> {city}</p>
            <p className="text-gray-700"><strong>Postal Code:</strong> {postalCode}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {phone}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg text-black">Payment Method:</h3>
            <p className="text-gray-700">{payment_method}</p>
          </div>

          <div className="bg-[#e0affc2a] p-4 border border-gray-200 rounded max-h-[300px] overflow-y-scroll">
            <h3 className="font-semibold text-lg text-black">Cart Summary:</h3>
            {order_items.length > 0 ? (
              order_items.map((item, index) => (
                <div key={index} className="flex justify-between mb-4 border-b-2 pb-2">
                  <div className="flex">
                    <img src={item.productImage} alt={item.item_name} className="w-16 h-16 rounded-sm mr-4" />
                    <div>
                      <h4 className="font-medium">{item.item_name}</h4>
                      <p className="text-gray-700"><strong>Quantity:</strong> {item.quantity}</p>
                      <p className="text-gray-700"><strong>Price:</strong> Rs {item.price}</p>
                      <p className="self-center text-gray-700">Item total Price Rs {item.price * item.quantity}</p>
                    </div>
                  </div>
                  
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items in cart</p>
            )}
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded">
            <div className="flex justify-between">
              <p className="font-semibold">Total Amount:</p>
              <p>Rs {total_amount.toFixed(2)}</p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
