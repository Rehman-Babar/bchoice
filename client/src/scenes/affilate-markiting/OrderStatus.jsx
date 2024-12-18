import React, { useState } from "react";

const OrderStatus = ({ order, updateStatus }) => {
  const [showIcon, setShowIcon] = useState(false); // For showing the edit icon
  const [showDropdown, setShowDropdown] = useState(false); // For showing the dropdown
  const [selectedStatus, setSelectedStatus] = useState(order.status); // Track the current status

  const statuses = [ "Delivered", "Dispatched", "Returned", "Issued", "Booked", "Return Recieved" ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status); // Update UI immediately
    setShowDropdown(false); // Close dropdown
    updateStatus(order._id, status); // Post status update
  };

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setShowIcon(true)} // Show edit icon on hover
      onMouseLeave={() => {
        setShowIcon(false);
        setShowDropdown(false);
      }} // Hide both icon and dropdown
    >
      {/* Status Display */}
      <span className="font-semibold text-[6px] lg:text-base">{selectedStatus}</span>

      {/* Edit Icon */}
      {showIcon && (
        <button
          className="ml-1 text-[7px] text-blue-500 hover:text-blue-700"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          ✏️ {/* Edit Icon */}
        </button>
      )}

      {/* Dropdown for Status Selection */}
      {showDropdown && (
        <div
          className="absolute top-full mt-0 lg:-mt-16 z-50 left-0 bg-white border rounded shadow-md w-40"
        >
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`block w-full text-left px-2 py-1 hover:bg-blue-100 ${
                status === selectedStatus ? "font-semibold text-blue-500" : "text-black"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
