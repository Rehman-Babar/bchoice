import React, { useEffect, useState } from "react";
import { FaEye, FaTruck, FaEdit } from "react-icons/fa";
import OrderModal from "./ModalForSubmitOrder";
import axios from "axios";
import toast from "react-hot-toast";
import { formatMemberSinceDate } from "utils/date";
import ViewOrderModal from "./ModalForViewOrder";
import OrderUpdateModal from "./ModalForUpdateAfilate";
import { useDispatch, useSelector } from "react-redux";
import { fetchAffilateOrders, removeOrder, setOrders } from "state/AffilateOrder/ordersForAffilate";
import { MdDeleteSweep } from "react-icons/md";

const AffilateTeam = () => {
  // const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.affilateorders.data);


  useEffect(() => {
    if (user?._id) {
      dispatch(fetchAffilateOrders(user._id)); // Fetch orders when the component mounts
    }
  }, [user?._id, dispatch]);
  
  // submit
  const [isModalOpen, setModalOpen] = useState(false);

  // view
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // edit
  const [isupdateModalOpen, setupdateModalOpen] = useState(false);
  const [currentOrderupdate, setCurrentOrderupdate] = useState(null);

  // Function to fetch orders


  // Function to open the modal
  const handleOpenModal = () => setModalOpen(true);

  // Function to close the modal
  const handleCloseModal = () => setModalOpen(false);

  // Function to close the modal
  const CloseViewModal = () => setViewModalOpen(false);

  const CloseEditModal = () => setupdateModalOpen(false);

  // Function to handle form submission
  const handleSubmitOrder = async (formData) => {
    console.log(formData)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v3/affilate/submitorder/affilate/team`, formData);
      toast.success("Order submitted successfully!");
      // Refetch all orders after successful submission

      // Close the modal
      handleCloseModal();
      dispatch(fetchAffilateOrders(user._id));
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order. Please try again.");
    }
  };
  const handleUpdateOrder = async (formData) => {
    if (!currentOrderupdate) {
      toast.error("No order selected for update.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v3/affilate/updateorder/affilate/team/update/${currentOrderupdate._id}`,
        formData
      );
      console.log("Order updated successfully:", response.data);
      toast.success("Order updated successfully!");
  
      // Refetch all orders after successful update
      dispatch(fetchAffilateOrders(user._id));
      // Close the modal
      CloseEditModal();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order. Please try again.");
    }
  };




  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#16a34a]  text-white";
      case "Dispatched":
        return "bg-[#0089ae]  text-white";
        case "Cancelled":
          return "bg-[#c8b6ff]  text-white";
      case "Returned":
        return "bg-[#ff3131]  text-white";
      case "Pending":
        return "bg-[#c8b6ff]  text-white";
      case "In Progress":
        return "bg-[#188bd5]  text-white";
      case "Issued":
        return "bg-[#b03434]  text-white";
        case "Booked":
          return "bg-[#403d39]  text-white";
      default:
        return "bg-[#403d39]  text-white";
    }
  };

  return (
    
<div className="lg:p-4 p-2">
  <div className="flex justify-between items-center mb-2">
    <div>
      <p className="font-semibold">Affiliate Orders ({orders.length})</p>
    </div>
    {/* <button
      onClick={handleOpenModal}
      className="mt-3 lg:px-4 lg:py-2 px-2 py-1 bg-[#A95FB8] text-white rounded hover:bg-[#D8B1FC]"
    >
      Add New
    </button> */}
  </div>
  <div className="overflow-auto h-full">
  {orders.length > 0 ? (
    <table className="min-w-full border border-gray-200">
<thead>
  <tr className="bg-[#FCF9FE] text-[8px] lg:text-[12px]">
    <th className="lg:p-2 p-1 text-left border border-gray-300">Sr#</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 ">ID#</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Product</th>

    <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Name</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Phone</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">City</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Total</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 ">Paid</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 ">COD</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300">Pay Status</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300">Status</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Date</th>
    {/* <th className="lg:p-2 p-1 text-left border border-gray-300">View</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Track</th>
    <th className="lg:p-2 p-1 text-left border border-gray-300">Edit</th> */}
    <th className="lg:p-2 p-1 text-left border border-gray-300">Action</th>
    
  </tr>
</thead>

      <tbody>
        {orders.map((order, index) => (
          <tr
            key={order._id}
            className="text-[6px] lg:text-[12px] hover:bg-[#FCF9FE]"
          >
            <td className="lg:p-2 p-1 border border-gray-300">{index + 1}</td>
            <td className="lg:p-2 p-1 border border-gray-300 ">
              {order.orderId}
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.product}</td>
            {/* Hide orderId on small screens */}
           
            <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">
              {order.clientName}
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">
              {order.phoneNumber1}
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">
              {order.mainCity}
            </td>
            <td className="lg:p-2 p-1 border border-gray-300  hidden lg:table-cell">PKR {order.totalAmount}</td>
            <td className="lg:p-2 p-1 border border-gray-300 ">
              PKR {order.paidAmount}
            </td>
            <td className="lg:p-2 p-1 border border-gray-300">
              PKR {order.cod}
            </td>
            <td className="lg:p-2 p-1 border text-center border-gray-300 ">
                  {order.isOrderpayed ? (
                    <span className="w-5 h-5 rounded-full inline-block  bg-[#16A34A]"></span>
                  ) : (
                    <span
                      
                      className="w-5 h-5 rounded-full inline-block  bg-[#B03434]"
                    ></span>
                  )}
                </td>
            <td
              className={`lg:p-2 p-1 border border-gray-300 text-center ${getStatusClass(
                order.status
              )}`}
            >
              {order.status}
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">
              {formatMemberSinceDate(order.createdAt)}
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 text-center ">
  <div className="flex justify-center space-x-4">
    {/* View Icon */}
    <FaEye
      onClick={() => {
        setCurrentOrder(order);
        setViewModalOpen(true);
      }}
      className="text-gray-800 cursor-pointer"
    />

    {/* Truck Icon */}
    <FaTruck className="text-gray-800 cursor-pointer" />

    {/* Edit Icon */}
    <FaEdit
      onClick={() => {
        setCurrentOrderupdate(order);
        setupdateModalOpen(true);
      }}
      className="text-gray-800 cursor-pointer"
    />
   
  </div>
</td>

          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-center mt-4 text-gray-600">
      You currently have no orders.
    </p>
  )}
    <button
    onClick={handleOpenModal}
    className="fixed bottom-4 right-4 bg-[#ff4560] text-white rounded-sm w-12 h-12 flex items-center justify-center shadow-lg hover:[#A99FB1]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</div>

  <OrderModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    onSubmit={handleSubmitOrder}
  />
  <OrderUpdateModal
    isOpen={isupdateModalOpen}
    onClose={CloseEditModal}
    onSubmit={handleUpdateOrder}
    order={currentOrderupdate}

  />
  <ViewOrderModal
    isOpen={isViewModalOpen}
    onClose={CloseViewModal}
    order={currentOrder}
    setCurrentOrderupdate={setCurrentOrderupdate}
        setupdateModalOpen={setupdateModalOpen}
  />
</div>

  
  );
};

export default AffilateTeam;
