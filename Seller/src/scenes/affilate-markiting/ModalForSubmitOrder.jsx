import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const OrderModal = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useSelector((state) => state.auth);
  const [gender, setGender] = useState("Male"); // For Male/Female display
  const [paymentStatus, setPaymentStatus] = useState("Paid"); // For Paid/Unpaid display

  const handleGenderChange = (gender) => {
    setGender(gender); // Set Male or Female
  };

  const handlePaymentStatusChange = (status) => {
    setPaymentStatus(status); // Set Paid or Unpaid
  };

  const initialFormData = {
    orderId: "",
    clientName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    email: "",
    priority: false,
    mainCity: "",
    totalAmount: "",
    paidAmount: "",
    cod: "",
    product: "",
    clientAddress: "",
    instruction: "",
    gender: "", // Make sure gender is part of the initial data
    paidOrNot: "" // Make sure paidOrNot is part of the initial data
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      sellerId: user?._id,
      gender, // Add gender to the form data
      paidOrNot: paymentStatus, // Add paystatus to the form data
    };
  
    // Dynamically update the cod value
    updatedFormData.cod = Number(updatedFormData.totalAmount || 0) - Number(updatedFormData.paidAmount || 0);
  
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to parent
     // Reset form fields
     console.log(formData)
    onClose(); // Close modal
    setFormData(initialFormData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h2 className="text-lg font-bold text-[#ff4560] mb-4 text-center">Submit New Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {/* Inputs for form */}
            <input
              name="orderId"
              type="text"
              placeholder="Order ID"
              value={formData.orderId}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            />
            <input
              name="clientName"
              type="text"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            />
            <input
              name="phoneNumber1"
              type="text"
              placeholder="Phone Number 1"
              value={formData.phoneNumber1}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            />
            <input
              name="phoneNumber2"
              type="text"
              placeholder="Phone Number 2 (Optional)"
              value={formData.phoneNumber2}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
            />
            <input
              name="email"
              type="email"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              
            />
            <input
              name="mainCity"
              type="text"
              placeholder="Main City"
              value={formData.mainCity}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            />
            <input
              name="totalAmount"
              type="number"
              placeholder="Total Amount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              
              required
            />
            <input
              name="paidAmount"
              type="number"
              placeholder="Paid Amount"
              value={formData.paidAmount}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
            />
            <input
              name="cod"
              type="number"
              placeholder={`Cash On Delivery ${String(Number(formData.totalAmount || 0) - Number(formData.paidAmount || 0))}`}
              // value={formData.cod}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full placeholder:text-black"
              required
              disabled
            />


            <input
              name="product"
              type="text"
              placeholder="Product"
              value={formData.product}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            />
            <textarea
              name="clientAddress"
              placeholder="Client Address"
              value={formData.clientAddress}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full col-span-1 md:col-span-2"
              required
            ></textarea>
            <textarea
              name="instruction"
              placeholder="Instruction"
              value={formData.instruction}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full col-span-1 md:col-span-2"
            ></textarea>
            <div className="col-span-1 md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="priority"
                  checked={formData.priority}
                  onChange={handleChange}
                />
                <span>Priority</span>
              </label>
            </div>
            <div className="col-span-2 flex justify-around border-b pb-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={() => handleGenderChange("Male")}
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="EveryOne"
                  checked={gender === "EveryOne"}
                  onChange={() => handleGenderChange("EveryOne")}
                />
                <span>EveryOne</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={() => handleGenderChange("Female")}
                />
                <span>Female</span>
              </label>
            </div>

            {/* Paid/Unpaid Radio Buttons */}
            <div className="col-span-2 flex justify-around border-b pb-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Paid"
                  checked={paymentStatus === "Paid"}
                  onChange={() => handlePaymentStatusChange("Paid")}
                  className="text-[#ff4560] checked:text-[#ff4560]"
                />
                <span>Paid</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Unpaid"
                  checked={paymentStatus === "Unpaid"}
                  onChange={() => handlePaymentStatusChange("Unpaid")}
                />
                <span>Unpaid</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="border-[#ff4560] border text-black px-4 py-2 rounded "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#ff4560] text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
