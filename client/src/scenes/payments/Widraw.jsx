import React, { useState, useEffect } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import ViewModal from "./ViewModal";
import Modal from "./UpdateModal";
import { useSelector } from "react-redux";
import { formatMemberSinceDate } from "utils/date";
import toast from "react-hot-toast";

const PandingWidraw = () => {
  const [payments, setPayments] = useState([]); // State for fetched payments
  const [selectedPayment, setSelectedPayment] = useState(null); // Selected payment for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedPaymentview, setSelectedPaymentview] = useState(null); // Selected payment for modal
  const [isModalOpenview, setIsModalOpenview] = useState(false); // Modal visibility state

  // const [isChecked, setIsChecked] = useState(false); // Checkbox for status update

  const fetchPayments = async () => {
    try {
      const response = await fetch(`https://admin-server-98to.onrender.com/api/v7/payment/unapproved`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setPayments(data); // Assuming API returns an array of payments
    } catch (err) {
      console.error("Error fetching payments:", err);
      toast.error("Error fetching payments");
    }
  };

  useEffect(() => {

    fetchPayments();
  }, []);

  // Handle view icon click
  const handleViewClick = (payment) => {
    setSelectedPaymentview(payment);
 // Set initial status // Set checkbox status based on payment status
    setIsModalOpenview(true);
  };
  // Handle view icon click
  const handleUpdateClick = (payment) => {
    setSelectedPayment(payment);
 // Set initial status // Set checkbox status based on payment status
    setIsModalOpen(true);
  };


  // Handle submit
  const handleSubmit = async () => {
    if (!selectedPayment) return;
    try {
      const response = await fetch(`https://admin-server-98to.onrender.com/api/v7/payment/unapproved/approve/admin/${selectedPayment._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      fetchPayments()

      toast.success("Payment status updated successfully!");
      setIsModalOpen(false);
      // fetchPayments(); // Re-fetch payments to update the table
    } catch (err) {
      console.error("Error updating payment status:", err);
      toast.error("Error updating payment status");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://admin-server-98to.onrender.com/api/v7/payment/unapproved/admin/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      toast.success("Payment deleted successfully!");
      fetchPayments()
      // fetchPayments(); // Re-fetch payments after deletion
    } catch (err) {
      console.error("Error deleting payment:", err);
      toast.error("Error deleting payment");
    }
  };

  return (
    <>
      <div className="w-full max-w-7xl bg-white lg:p-4 rounded-sm overflow-x-auto">
        <h1 className="text-gray-700 text-xl text-start font-semibold mb-3">Panding Widraw</h1>

        {/* Check if there are no payments */}
        {payments.length === 0 ? (
          <p className="text-center text-gray-500">No payments available.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 lg:text-sm text-[5px]">
            <thead>
              <tr className="bg-[#FCF9FE]">
                <th className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-left">#</th>
                <th className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-left">UserName</th>
                <th className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-left">Method</th>
                <th className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-left">Account</th>
                <th className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-right">Amount (Rs)</th>
                <th className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-left">Date</th>
                <th className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-left">Status</th>
                <th className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`${index % 2 === 0 ? "bg-[#FCF9FE]" : "bg-white"} hover:bg-blue-50`}
                >
                  <td className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1">{index + 1}</td>
                  <td className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1">{payment.accountHolderName}</td>
                  <td className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1">{payment.paymentMethod}</td>
                  <td className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1">
                    {payment?.bankNumber || payment?.phoneNumber || "N/A"}
                  </td>

                  <td className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-right">
                    {payment.amount.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1">{formatMemberSinceDate(payment.createdAt)}</td>
                  <td
                    className={`border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 font-medium ${
                      payment.status === "Completed"
                        ? "text-green-600"
                        : payment.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-center space-x-2 flex items-center justify-center">
                    <FaEye
                      className="text-gray-800 cursor-pointer hover:text-gray-600"
                      size={18}
                      onClick={() => handleViewClick(payment)}
                    />
                    <button
                      onClick={() => handleDelete(payment._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTimes size={18} />
                    </button>
                    <button
                      onClick={() => handleUpdateClick(payment)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaCheck size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpenview && selectedPaymentview && (
        <ViewModal onClose={() => setIsModalOpenview(false)}>
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold mb-4 border-b">Payment Details</h2>
            <div className="space-y-1">
              <p className="border-b">
                <strong>UserName:</strong> {selectedPaymentview.accountHolderName}
              </p>
              <p className="border-b">
                <strong>Method:</strong> {selectedPaymentview.paymentMethod}
              </p>
              <p className="border-b">
                <strong>Account:</strong> {selectedPaymentview?.bankNumber || selectedPaymentview?.phoneNumber || "N/A"}
              </p>
              <p className="border-b">
                <strong>Amount (Rs):</strong> {selectedPaymentview.amount.toFixed(2)}
              </p>
              <p className="border-b">
                <strong>Date:</strong> {formatMemberSinceDate(selectedPaymentview.createdAt)}
              </p>

            </div>
          </div>
        </ViewModal>
      )}
      {/* update */}
      {isModalOpen && selectedPayment && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold mb-4 border-b">Payment Details</h2>
            <div className="space-y-1">
              <p className="border-b">
                <strong>UserName:</strong> {selectedPayment.accountHolderName}
              </p>
              <p className="border-b">
                <strong>Method:</strong> {selectedPayment.paymentMethod}
              </p>
              <p className="border-b">
                <strong>Account:</strong> {selectedPayment?.bankNumber || selectedPayment?.phoneNumber || "N/A"}
              </p>
              <p className="border-b">
                <strong>Amount (Rs):</strong> {selectedPayment.amount.toFixed(2)}
              </p>
              <p className="border-b">
                <strong>Date:</strong> {formatMemberSinceDate(selectedPayment.createdAt)}
              </p>

            </div>
            <div className="mt-4 space-x-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update Status
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PandingWidraw;
