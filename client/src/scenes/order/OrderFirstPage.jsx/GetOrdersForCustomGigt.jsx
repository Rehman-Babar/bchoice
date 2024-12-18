import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, selectCustomGiftOrders } from "state/ordersData/GetOrderHook";
import { formatPostDates } from "utils/date.js";
import OrderModal from "../OrderModal";
// import OrderModal from "./OrderModal";

function GetOrderForCustomGift() {
  const dispatch = useDispatch();
      
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const customGiftOrders = useSelector(selectCustomGiftOrders);

  const [editStatusId, setEditStatusId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const orderStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);

  if (orderStatus === "loading") return <p>Loading orders...</p>;
  if (orderStatus === "failed") return <p>Error loading orders: {error}</p>;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;
    setDeleteLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/client/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.error) {
        toast.error("Internal server error: " + data.error);
        return;
      }
      toast.success("Order deleted successfully");
      dispatch(fetchOrders());
    } catch (error) {
      toast.error("Failed to delete order");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewClick = (order) => {
    setCurrentProduct(order);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentProduct(null);
  };

  const handleStatusEditClick = (orderId) => {
    setEditStatusId(orderId);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const updateStatus = async (orderId) => {
    if (newStatus === "") return;
    const confirmUpdate = window.confirm("Are you sure you want to update the status?");
    if (!confirmUpdate) return;

    setLoadingOrderId(orderId);
    try {
      const response = await fetch(`http://localhost:8000/client/order/update/order-status/${orderId}`, {
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
      dispatch(fetchOrders());
      setEditStatusId(null);
      setNewStatus("");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="text-center text-black text-xl md:text-3xl my-4">Custom Gift OrdersData</div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#e0affc2a] border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customGiftOrders.map((order, index) => (
                <tr key={order._id}>
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
                          {loadingOrderId === order._id ? "Updating..." : "Update"}
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
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-200 hover:bg-red-300 text-red-700 px-2 py-1 rounded mr-2"
                      disabled={deleteLoading}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleStatusEditClick(order._id)}
                      className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-2 py-1 rounded"
                    >
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

export default GetOrderForCustomGift;
