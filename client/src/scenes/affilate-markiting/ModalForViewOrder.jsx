import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the cross icon
import { formatMemberSinceDate } from "utils/date";

const ViewOrderModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50">
      <div className="bg-[#FCF9FE] p-4 md:p-6 rounded-lg shadow-lg w-[90%] sm:w-[75%] md:w-[60%] lg:w-[40%] xl:w-[25%] relative">
        <h1 className="text-sm font-bold">Order Details</h1>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Order details */}
        <div className="mt-2 text-[8px] sm:text-[11px]">
          {/* Container for all rows */}
          <div className="grid grid-cols-2 gap-2">
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Order ID:</label>
    <p className="ml-2 text-gray-800">{order.orderId}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Order Payment:</label>
    <p className="ml-2 text-gray-800">
      {order.sellerPersonalBallance ? order.sellerPersonalBallance : "Not Approved Yet"}
    </p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Product:</label>
    <p className="ml-2 text-gray-800">{order.product}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Gender:</label>
    <p className="ml-2 text-gray-800">{order.gender}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">PaidOrNot:</label>
    <p className="ml-2 text-gray-800">{order.paidOrNot}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Client Name:</label>
    <p className="ml-2 text-gray-800">{order.clientName}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Phone:</label>
    <p className="ml-2 text-gray-800">{order.phoneNumber1}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Optional Phone:</label>
    <p className="ml-2 text-gray-800">{order.phoneNumber2 || "No"}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Gmail:</label>
    <p className="ml-2 text-gray-800">{order.email}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">City:</label>
    <p className="ml-2 text-gray-800">{order.mainCity}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Total Amount:</label>
    <p className="ml-2 text-gray-800">PKR {order.totalAmount}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Paid Amount:</label>
    <p className="ml-2 text-gray-800">PKR {order.paidAmount}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">COD Amount:</label>
    <p className="ml-2 text-gray-800">PKR {order.cod}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Status:</label>
    <p className="ml-2 text-gray-800">{order.status}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Order Priority:</label>
    <p className="ml-2 text-gray-800">{order.priority ? "true" : "false"}</p>
  </div>
  <div className="flex-1 flex items-center mb-2 border-b-2 pb-1">
    <label className="font-semibold">Order Date:</label>
    <p className="ml-2 text-gray-800">{formatMemberSinceDate(order.createdAt)}</p>
  </div>
</div>


          {/* Scrollable Order Instruction */}
          <div className="border-2 border-b-2lack1p-2 max-h-28 overflow-y-auto">
            <label className="font-semibold">Order Instruction:</label>
            <p className="ml-2 text-gray-800">{order.instruction}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
