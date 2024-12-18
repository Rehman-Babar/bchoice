import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "state/ordersData/GetOrderHook";
import { formatPostDates } from "utils/date.js";
import OrderModal from "./OrderModal";

function GetOrder() {
  const dispatch = useDispatch();

  // Fetch all orders from Redux
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const allOrders = useSelector((state) => state.orders.orders);
  const [orders, setOrders] = useState([]);
  const [editStatusId, setEditStatusId] = useState(null); // Track the order being edited
  const [newStatus, setNewStatus] = useState(""); // Track the selected status
  const [loadingOrderId, setLoadingOrderId] = useState(null); 

  useEffect(() => {
    setOrders(allOrders); // Sync local orders state with Redux
  }, [allOrders]);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) {
      return;
    }
    setDeleteLoading(true);
    try {
      const response = await fetch(`/client/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      if (data) {
        toast.success("Order deleted successfully");
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        toast.error("Failed to delete order: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    } finally {
      setDeleteLoading(false);
    }
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleViewClick = (order) => {
    setCurrentProduct(order);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentProduct(null);
  };

  const handleStatusEditClick = (orderId) => {
    setEditStatusId(orderId); // Set the order id for editing
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value); // Update the new status value
  };

  const updateStatus = async (orderId) => {
    if (newStatus === "") return; // If no status is selected, do nothing
    const confirmUpdate = window.confirm("Are you sure you want to update the status?");
    if (!confirmUpdate) return;

    setLoadingOrderId(orderId); // Set loading state for this order
    try {
      const response = await fetch(`/client/order/update/order-status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.error) {
        toast.error("Failed to update status: " + data.error);
        return;
      }
      toast.success("Order status updated successfully");
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setEditStatusId(null);
      setNewStatus("");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoadingOrderId(null); // Remove loading state
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="text-center text-black text-xl md:text-3xl my-4">All Orders</div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#e0affc2a] border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sr No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">BC{order._id.slice(0, 6)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{formatPostDates(order.created_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">{order.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">
                    {editStatusId === order._id ? (
                      <div className="flex items-center">
                        <select
                          value={newStatus}
                          onChange={handleStatusChange}
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="">Select Status</option>
                          <option value="InProgress">In Progress</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Returned">Returned</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Issued">Issued</option>
                        </select>
                        <button
                          onClick={() => updateStatus(order._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded ml-2"
                          disabled={loadingOrderId === order._id}
                        >
                          {loadingOrderId === order._id ? (
                            /* From Uiverse.io by devAaus */ 
                                <div className="flex-col gap-4 w-full flex items-center justify-center">
                                  <div
                                    className="w-7 h-7 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                                  >
                                    <div
                                      className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                                    ></div>
                                  </div>
                                </div>

                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    ) : (
                      order.status
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">Rs:{order.total_amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewClick(order)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded mr-2">
                      View
                    </button>
                    <button
                      className="bg-red-200 hover:bg-red-300 text-red-700 px-2 py-1 rounded mr-2"
                      onClick={() => handleDelete(order._id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => handleStatusEditClick(order._id)}
                      className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-2 py-1 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isViewModalOpen && <OrderModal productData={currentProduct} closeModal={closeViewModal} />}
    </>
  );
}

export default GetOrder;
