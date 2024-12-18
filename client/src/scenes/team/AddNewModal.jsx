import React, { useState, useEffect } from "react";
import axios from "axios";
import BulkPaymentModal from "./BulkPaymentModal";

const AddNewTaskModal = ({ isOpen, onClose, user, invetments, fetchInvetments }) => {
  const [formData, setFormData] = useState({
    selectedUser: "",
    userName: "",
    investmentCtr: "",
    newAmount: "",
    subtractAmount: "",
    amount: "",
    prevAmount: 0,
  });
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkModalOpen, setBulkModalOpen] = useState(false); // Manage Bulk Modal visibility
  const handleOpenBulkModal = () => {
    setBulkModalOpen(true);
  };

  const handleCloseBulkModal = () => {
    setBulkModalOpen(false);
  };

  // Update user-specific data when selected
  useEffect(() => {
    if (formData.selectedUser) {
      const selectedUser = user.find((u) => u._id === formData.selectedUser);

      if (selectedUser) {
        const matchingInvestments = invetments.filter(
          (inv) => inv.userName === selectedUser.fullName
        );

        const totalInvestment = matchingInvestments.reduce(
          (sum, inv) => sum + (inv.investmentAmount || 0),
          0
        );

        setFormData((prevData) => ({
          ...prevData,
          userName: selectedUser.fullName,
          prevAmount: totalInvestment,
        }));
        setCalculatedAmount(totalInvestment);
      } else {
        setFormData((prevData) => ({
          ...prevData,
          prevAmount: 0,
        }));
        setCalculatedAmount(0);
      }
    }
  }, [formData.selectedUser, user, invetments]);

  // Handle input changes for New Amount
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    const newCalculatedAmount = formData.prevAmount + value;
    setFormData((prevData) => ({
      ...prevData,
      newAmount: value,
      subtractAmount: "",
      amount: newCalculatedAmount,
    }));
    setCalculatedAmount(newCalculatedAmount);
  };

  // Handle input changes for Subtract Amount
  const handleSubtractChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    const newCalculatedAmount = formData.prevAmount - value;
    setFormData((prevData) => ({
      ...prevData,
      subtractAmount: value,
      newAmount: "",
      amount: newCalculatedAmount,
    }));
    setCalculatedAmount(newCalculatedAmount);
  };

  // Handle changes for other inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit form data
  const handleSubmit = async () => {
    if (!formData.selectedUser || !formData.investmentCtr || !formData.amount) {
      alert("Please fill all required fields.");
      return;
    }

    const dataToSend = {
      sellerId: formData.selectedUser,
      userName: formData.userName,
      investmentCtr: formData.investmentCtr,
      investmentAmount: formData.amount,
    };

    setIsLoading(true);

    try {
      await axios.post("/api/v8/invest/send", dataToSend);
      fetchInvetments();
      onClose();
      setFormData({
        selectedUser: "",
        userName: "",
        investmentCtr: "",
        newAmount: "",
        subtractAmount: "",
        amount: "",
        prevAmount: 0,
      });
      setCalculatedAmount(0);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white -lg shadow-lg p-6 w-96">
        <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4 text-[#ff4560]">Add Payment</h2>
        <button
            onClick={handleOpenBulkModal}
            className="px-4 py-2 bg-[#ff4560] text-white text-sm"
          >
            Bulk Payment
          </button>
        
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Employee Name</label>
          <select
            value={formData.selectedUser}
            onChange={(e) =>
              setFormData((prevData) => ({ ...prevData, selectedUser: e.target.value }))
            }
            className="w-full border px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Select an Employee
            </option>
            {user?.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
        <div className="border border-blue-200 p-4 mb-4">
          <div className="flex justify-between items-center mb-3 bg-[#ff4560]">
            <label className="text-white p-1 font-semibold text-xs">New Amount:</label>
            <input
              type="number"
              name="newAmount"
              value={formData.newAmount}
              onChange={handleAmountChange}
              placeholder="Enter New Amount"
              className="border px-2 py-1 text-sm w-2/3"
            />
          </div>
          <div className="flex justify-between items-center mb-3 bg-[#ff4560]">
            <label className="text-white p-1 font-semibold text-xs">Subtract:</label>
            <input
              type="number"
              name="subtractAmount"
              value={formData.subtractAmount}
              onChange={handleSubtractChange}
              placeholder="Enter Subtraction Amount"
              className="border px-2 py-1 text-sm w-2/3"
            />
          </div>
          <div className="flex justify-between items-center mb-3 bg-[#ff4560]">
            <label className="text-white p-1 font-semibold text-xs">Ctr:</label>
            <input
              type="text"
              name="investmentCtr"
              value={formData.investmentCtr}
              onChange={handleChange}
              placeholder="Enter Ctr"
              className="border px-2 py-1 text-sm w-2/3"
            />
          </div>
          <p className="mb-5 text-xs">
            Updated Total Amount: <span className="text-[#ff4560]">{calculatedAmount} PKR</span>
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border text-sm hover:bg-gray-300"
            disabled={isLoading}
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#ff4560] text-white p-1 text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
      {isBulkModalOpen && (
        <BulkPaymentModal
          isOpen={isBulkModalOpen}
          onClose={handleCloseBulkModal}
          users={user}
          investments={invetments}
          fetchInvestments={fetchInvetments}
        />
      )}
    </div>
  );
};

export default AddNewTaskModal;
