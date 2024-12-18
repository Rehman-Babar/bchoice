import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import Modal from "./ViewModal";
import { formatMemberSinceDate } from "utils/date";
import toast from "react-hot-toast";

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState([]); // State for fetched payments
  const [selectedPayment, setSelectedPayment] = useState(null); // Selected payment for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  
  useEffect(() => {
    // Fetch payments
    const fetchPayments = async () => {
      try {
        const response = await fetch(`/api/v7/payment/approved/history`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if(data.error){
          toast.error("Error: ${data.error")
          return;
        }
        console.log(data)
        setPayments(data); // Assuming API returns { payments: [] }
      } catch (err) {
        console.error("Error fetching payments:", err);
        toast.error("Error fetching payments")

      }
    };

    fetchPayments();
  }, []);

  // Handle view icon click
  const handleViewClick = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full max-w-7xl bg-white lg:p-4 p-2 rounded-sm overflow-x-auto">
        <h1 className="text-gray-700 text-xl text-start font-semibold mb-3">Payment History</h1>

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
                  <td className="border border-gray-300 lg:px-4 lg:py-2 px-1 py-1 text-center">
                    <FaEye
                      className="text-gray-800 cursor-pointer hover:text-gray-600"
                      size={18}
                      onClick={() => handleViewClick(payment)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
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
              <p className="border-b">
                <strong>Status:</strong> {selectedPayment.status}
              </p>
            </div>
          </div>
        </Modal>
      )}
    
    </>
  );
};

export default PaymentHistoryPage;
