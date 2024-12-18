
import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the cross icon
import { Link } from "react-router-dom";
import { formatMemberSinceDate } from "utils/date";

const ViewOrderModal = ({ isOpen, onClose, order,setCurrentOrderupdate,setupdateModalOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FCF9FE] p-4 md:p-6 rounded-lg shadow-lg w-[90%] sm:w-[75%] md:w-[60%] lg:w-[40%] xl:w-[25%] relative">

      <div className="flex items-center justify-around mb-2">
          <Link
            to={{
              pathname: `/affilate/marketer/team/reporting complaient`,
            }}
            state={{ orderId: order.orderId }} // Pass orderId using state
            className="bg-[#ff4560] text-white font-semibold px-2 py-1 rounded"
          >
            Complaint
          </Link>
          <button
            className="bg-gray-600 text-white font-semibold px-2 py-1 rounded"
          >
            Track Now
          </button>
          <button
            className=" text-gray-800 border-2 border-gray-600 font-semibold px-4 py-1 rounded"
            onClick={() => {
              setCurrentOrderupdate(order);
              setupdateModalOpen(true);
              onClose()
            }}
          >
            Edit
          </button>
          </div>

          <h1 className="text-sm font-bold">Order Details :</h1>
          

       
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Order details */}
        
          
          <div className="space-y-1 mt-2 text-[8px] sm:text-[11px]">
          <div className="flex justify-start items-center border-b-2 pb-1">
            <label className="font-semibold">Order ID:</label>
            <p className="ml-2 text-gray-800">{order.orderId}</p>
          </div>
          <div className="flex justify-start items-center border-b-2 pb-1">
            <label className="font-semibold">Order Payment:</label>
            <p className="ml-2 text-gray-800">
              {order.sellerPersonalBallanceForCompany
                ? order.sellerPersonalBallanceForCompany
                : "Not Approved Yet"}
            </p>
          </div>
        {/*  */}
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Product:</label>
          <p className="ml-2 text-gray-800">{order.product}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Gender:</label>
          <p className="ml-2 text-gray-800">{order.gender}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">PaidOrNot:</label>
          <p className="ml-2 text-gray-800">{order.paidOrNot}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Client Name:</label>
          <p className="ml-2 text-gray-800">{order.clientName}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Phone:</label>
          <p className="ml-2 text-gray-800">{order.phoneNumber1}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Optional Phone:</label>
          <p className="ml-2 text-gray-800">{order.phoneNumber2 || "No"}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Gmail:</label>
          <p className="ml-2 text-gray-800">{order.email}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">City:</label>
          <p className="ml-2 text-gray-800">{order.mainCity}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Total Amount:</label>
          <p className="ml-2 text-gray-800">PKR {order.totalAmount}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Paid Amount:</label>
          <p className="ml-2 text-gray-800">PKR {order.paidAmount}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">COD Amount:</label>
          <p className="ml-2 text-gray-800">PKR {order.cod}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Status:</label>
          <p className="ml-2 text-gray-800">{order.status}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Order Priority:</label>
          <p className="ml-2 text-gray-800">{order.priority ? "true" : "false"}</p>
        </div>
        <div className="flex justify-start items-center border-b-2 pb-1">
          <label className="font-semibold">Order Date:</label>
          <p className="ml-2 text-gray-800">{formatMemberSinceDate(order.createdAt)}</p>
        </div>
        <div className="border-2 border-black p-1 pb-1 max-h-28 overflow-y-auto">
          <label className="font-semibold">Order Instruction:</label>
          <p className="ml-2 text-gray-800">{order.instruction}</p>
        </div>
      
          {/* Add other order details here */}
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;

