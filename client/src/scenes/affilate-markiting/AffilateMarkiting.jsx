import React, { useEffect, useState } from "react";
import { FaEye, FaTruck, FaEdit } from "react-icons/fa";
// import OrderModal from "./ModalForSubmitOrder";
import axios from "axios";
import toast from "react-hot-toast";
import { formatMemberSinceDate } from "utils/date";
import ViewOrderModal from "./ModalForViewOrder";
import OrderUpdateModal from "./ModalForUpdateAfilate";
import OrderStatus from "./OrderStatus";
import { MdDeleteSweep } from "react-icons/md";

const AffilateTeam = () => {
  const [orders, setOrders] = useState([]);
  
  // submit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderForModal, setCurrentOrderForModal] = useState(null);
  const CloseModal = () => setIsModalOpen(false); // Close the custom modal
  const [isChecked, setIsChecked] = useState(false); // For checkbox
const [sellerPersonalBallance, setsellerPersonalBallance] = useState(''); // For the input field


  // view
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // edit
  const [isupdateModalOpen, setupdateModalOpen] = useState(false);
  const [currentOrderupdate, setCurrentOrderupdate] = useState(null);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v3/affilate/getorder/affilate/ceo");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  // Function to close the modal
  const CloseViewModal = () => setViewModalOpen(false);

  const CloseEditModal = () => setupdateModalOpen(false);


  const handleUpdateOrder = async (formData) => {
    if (!currentOrderupdate) {
      toast.error("No order selected for update.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v3/affilate/updateorder/affilate/team/update/${currentOrderupdate._id}`,
        formData
      );
      console.log("Order updated successfully:", response.data);
      toast.success("Order updated successfully!");
  
      // Refetch all orders after successful update
      fetchOrders();
  
      // Close the modal
      CloseEditModal();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order. Please try again.");
    }
  };
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v3/affilate/updateorderstatus/affilate/team/status/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      console.log("Status updated:", data);

      // Update local order data
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };


  const handleRedDotClick = (order) => {
    setCurrentOrderForModal(order); // Set the current order when red dot is clicked
    setIsModalOpen(true); // Open the modal

  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update checkbox state
  };
  
  const handleInputChange = (e) => {
    setsellerPersonalBallance(e.target.value); // Update input field state
  };
  const handleSubmit = async () => {
    // console.log(currentOrderForModal._id);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v3/affilate/update/ballance/affilate/team/${currentOrderForModal._id}`,
        {
          isOrderpayed: isChecked, // Send checkbox value
          sellerPersonalBallance: sellerPersonalBallance, // Send input field value
        }
      );
  
      console.log("Payment approved:", response.data);
  
      if (response.status === 200) { // Check if the request was successful
        toast.success("Payment approved successfully!");
        setsellerPersonalBallance(""); // Reset sellerPersonalBallance
        setIsChecked(false); // Reset checkbox
        setIsModalOpen(false); // Close the modal
        fetchOrders(); // Refresh order list
      }
    } catch (error) {
      console.error("Error approving payment:", error);
      toast.error("Failed to approve payment. Please try again.");
    }
  };
  
  
  

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);
  const handleDeleteOrder = async (orderId) => {
    // Add confirmation before deleting the order
const isConfirmed = window.confirm("Are you sure you want to delete this order?");
if (!isConfirmed) {
  toast.info("Order deletion canceled.");
  return;
}
  if (!orderId) {
    toast.error("No order selected for deletion.");
    return;
  }

  try {
    // API call to delete the order
    await axios.delete(
      `http://localhost:8000/api/v3/affilate/delete/affilate/team/${orderId}`
    );

    // Notify the user of success
    toast.success("Order deleted successfully!");
    fetchOrders();
  } catch (error) {
    console.error("Error deleting order:", error);
    toast.error("Failed to delete order. Please try again.");
  }
};

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#16a34a]  text-white";
      case "Dispatched":
        return "bg-[#0089ae]  text-white";
        case "Cancelled":
          return "bg-[#ff3131]  text-white";
      case "Returned":
        return "bg-[#ff3131]  text-white";
      case "Pending":
        return "bg-gray-600  text-white";
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
    
<div className="lg:p-4 p-1">
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <div>
      <p className="font-semibold">Affiliate Orders ({orders.length})</p>
    </div>
  </div>

  {/* Responsive Table Container */}
  <div className="overflow-auto h-full">
    <table className="min-w-full  border border-gray-200">
      {/* Table Header */}
      <thead>
        <tr className="bg-[#FCF9FE] text-[8px] lg:text-[11px]">
          <th className="lg:p-2 p-1 text-left border border-gray-300">Sr#</th>
          
          <th className="lg:p-2 p-1 text-left border border-gray-300 hidden md:table-cell">ID#</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300">Product</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300">Client Name</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Phone</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300">City</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Total</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300 hidden lg:table-cell">Paid</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300 hidden xl:table-cell">COD</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300">Status</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300">Pay Status</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300 hidden md:table-cell">Date</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300">View</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300 hidden sm:table-cell">Track</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300">Edit</th>
          <th className="lg:p-2 p-1 text-left border border-gray-300">Del</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {orders.map((order, index) => (
          <tr key={order._id} className="text-[6px] lg:text-[11px] *:hover:bg-[#FCF9FE] *:hover:text-black">
            <td className="lg:p-2 p-1 border border-gray-300">{index + 1}</td>
            
            <td className="lg:p-2 p-1 border border-gray-300 hidden md:table-cell">{order.orderId}</td>
            <td className="lg:p-2 p-1 border border-gray-300">{order.product}</td>
            <td className="lg:p-2 p-1 border border-gray-300">{order.clientName}</td>
            <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">{order.phoneNumber1}</td>
            <td className="lg:p-2 p-1 border border-gray-300">{order.mainCity}</td>
            <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">PKR {order.totalAmount}</td>
            <td className="lg:p-2 p-1 border border-gray-300 hidden lg:table-cell">PKR {order.paidAmount}</td>
            <td className="lg:p-2 p-1 border border-gray-300 hidden xl:table-cell">PKR {order.cod}</td>
            <td
              className={`lg:p-2 border border-gray-300 text-[6px] lg:text-[11px] text-center ${getStatusClass(
                order.status
              )}`}
            >
              <div className="relative w-9 lg:w-24">
                <OrderStatus
                  order={order}
                  updateStatus={handleStatusUpdate} // Pass the update function
                />
              </div>
            </td>
            <td className="lg:p-2 p-1 border text-center border-gray-300 ">
                  {order.isOrderpayed ? (
                    <span className="text-[#16A34A]">PKR {order.sellerPersonalBallanceForCompany}</span>
                  ) : (
                    <span
                      onClick={() => handleRedDotClick(order)} // Open modal on click
                      className="w-5 h-5 rounded-full inline-block cursor-pointer bg-[#B03434]"
                    ></span>
                  )}
            </td>

            <td className="lg:p-2 p-1 border border-gray-300 hidden md:table-cell">
              {formatMemberSinceDate(order.createdAt)}
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 text-center">
              <FaEye
                onClick={() => {
                  setCurrentOrder(order);
                  setViewModalOpen(true);
                }}
                className="text-gray-800 cursor-pointer"
              />
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 text-center hidden sm:table-cell">
              <FaTruck className="text-gray-800 cursor-pointer" />
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 text-center">
              <FaEdit
                onClick={() => {
                  setCurrentOrderupdate(order);
                  setupdateModalOpen(true);
                }}
                className="text-gray-800 cursor-pointer"
              />
            </td>
            <td className="lg:p-2 p-1 border border-gray-300 text-center">
               {/* delete */}
                <MdDeleteSweep
                onClick={() => handleDeleteOrder(order._id)}
                className="text-gray-800 cursor-pointer lg:text-[16px]"
              />
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Modals */}
  {/* <OrderModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    onSubmit={handleSubmitOrder}
  /> */}
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
  />
   {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center">
  <div className="bg-white p-6 rounded-sm space-y-4">

    <p className="text-lg text-gray-700 mt-2">Update Seller's Personal Balance In (PKR)</p>

    {/* Checkbox */}
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label className="text-gray-700 text-sm">Select to approve payment</label>
    </div>

    {/* Input field */}
    <input
      type="text"
      placeholder="Enter sellerPersonalBallance here..."
      value={sellerPersonalBallance}
      onChange={handleInputChange}
      className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Buttons */}
    <div className="flex justify-between mt-4">
      <button onClick={CloseModal} className="bg-gray-500 text-white px-4 py-2 rounded">
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Confirm
      </button>
    </div>
  </div>
</div>


      )}
</div>


  );
};

export default AffilateTeam;
