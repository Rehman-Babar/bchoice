import React, { useState, useEffect } from "react";

const OrderUpdateModal = ({ isOpen, onClose, onSubmit, order }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen && order) {
      const initialFormData = {
        orderId: order.orderId,
        clientName: order.clientName,
        phoneNumber1: order.phoneNumber1,
        phoneNumber2: order.phoneNumber2,
        email: order.email,
        priority: order.priority,
        mainCity: order.mainCity,
        totalAmount: order.totalAmount,
        paidAmount: order.paidAmount,
        cod: order.cod,
        product: order.product,
        clientAddress: order.clientAddress,
        instruction: order.instruction,
        paidOrNot: order.paidOrNot || "", // Add paidOrNot field
        gender: order.gender || "", // Add gender field
      };
      setFormData(initialFormData);
    }
  }, [isOpen, order]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (name === "totalAmount" || name === "paidAmount") {
      // If totalAmount or paidAmount is changed, update the COD value
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        cod: (name === "totalAmount" ? value : formData.totalAmount) - (name === "paidAmount" ? value : formData.paidAmount),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to parent
    console.log(formData)
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div className="relative bg-white p-3 sm:p-6 rounded-sm shadow-sm w-full sm:w-3/4 lg:w-1/3">
    <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold text-gray-800 hover:text-gray-700"
        >
          
          &times;
    </button>
    <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Update Order</h2>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2">
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="orderId">
            Order ID
          </label>
          <input
            id="orderId"
            name="orderId"
            type="text"
            value={formData.orderId || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
            
          />
        </div>

        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="clientName">
            Client Name
          </label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            value={formData.clientName || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
            
          />
        </div>
        <div>
              <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="paidOrNot">
                Paid or Not
              </label>
              <select
                id="paidOrNot"
                name="paidOrNot"
                value={formData.paidOrNot || ""}
                onChange={handleChange}
                className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
                
              >
                <option value="">Select Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            {/* Add gender */}
            <div>
              <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
                
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="EveryOne">EveryOne</option>
              </select>
            </div>
            {/* Existing fields continue */}
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="phoneNumber1">
            Phone Number 1
          </label>
          <input
            id="phoneNumber1"
            name="phoneNumber1"
            type="text"
            value={formData.phoneNumber1 || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
            
          />
        </div>
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="phoneNumber2">
            Phone Number 2 (Optional)
          </label>
          <input
            id="phoneNumber2"
            name="phoneNumber2"
            type="text"
            value={formData.phoneNumber2 || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
          />
        </div>
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
            
          />
        </div>
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="mainCity">
            Main City
          </label>
          <input
            id="mainCity"
            name="mainCity"
            type="text"
            value={formData.mainCity || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
            
          />
        </div>
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="totalAmount">
            Total Amount
          </label>
          <input
            id="totalAmount"
            name="totalAmount"
            type="number"
            value={formData.totalAmount || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
            
          />
        </div>
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="paidAmount">
            Paid Amount
          </label>
          <input
            id="paidAmount"
            name="paidAmount"
            type="number"
            value={formData.paidAmount || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
          />
        </div>
        <div>
  <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="cod">
    Cash On Delivery (COD)
  </label>
  <input
    name="cod"
    type="number"
    value={String(Number(formData.totalAmount || 0) - Number(formData.paidAmount || 0))}
    className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
    disabled
  />
</div>


        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="product">
            Product
          </label>
          <input
            id="product"
            name="product"
            type="text"
            value={formData.product || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
            
          />
        </div>
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="clientAddress">
            Client Address
          </label>
          <textarea
            id="clientAddress"
            name="clientAddress"
            value={formData.clientAddress || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
            
          ></textarea>
        </div>
        <div>
          <label className="block text-[9px] sm:text-[10px] font-medium mb-1" htmlFor="instruction">
            Instruction
          </label>
          <textarea
            id="instruction"
            name="instruction"
            value={formData.instruction || ""}
            onChange={handleChange}
            className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-[10px]"
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="flex items-center space-x-2 text-[9px] sm:text-[10px]">
            <input
              id="priority"
              type="checkbox"
              name="priority"
              checked={formData.priority || false}
              onChange={handleChange}
            />
            <span>Priority</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-3 py-1 sm:px-4 sm:py-2 rounded mr-2 text-[9px] sm:text-[10px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#e4c1f9] text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-[9px] sm:text-[10px]"
        >
          Update Order
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default OrderUpdateModal;
