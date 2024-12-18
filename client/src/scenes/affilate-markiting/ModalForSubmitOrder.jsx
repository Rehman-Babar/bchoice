import React, { useState } from "react";

const OrderModal = ({ isOpen, onClose, onSubmit }) => {
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
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to parent
    setFormData(initialFormData); // Reset form fields
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2">
      <h2 className="text-lg font-bold mb-4 text-center">Submit New Order</h2>
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
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border md:p-2 p-1 rounded w-full"
            required
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
            type="text"
            placeholder="Cash On Delivery"
            value={formData.cod}
            onChange={handleChange}
            className="border md:p-2 p-1 rounded w-full"
            required
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
        </div>
  
        {/* Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
