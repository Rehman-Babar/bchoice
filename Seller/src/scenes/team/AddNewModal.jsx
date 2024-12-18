import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNewTaskModal = ({ isOpen, onClose, user, invetments , fetchInvetments}) => {
  const [formData, setFormData] = useState({
    selectedUser: "",
    userName: "",
    investmentCtr: "",
    newAmount: "",
    amount: "",
    prevAmount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update form data when a user is selected
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
      } else {
        setFormData((prevData) => ({
          ...prevData,
          prevAmount: 0,
        }));
      }
    }
  }, [formData.selectedUser, user, invetments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedUser: e.target.value,
    }));
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData((prevData) => ({
      ...prevData,
      newAmount: value,
      amount: prevData.prevAmount ? prevData.prevAmount - value : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.selectedUser || !formData.investmentCtr || !formData.newAmount) {
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
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v8/invest/send`, dataToSend);
      fetchInvetments();  // Refresh the investments data
      onClose();          // Close the modal
      // Reset form data
      setFormData({
        selectedUser: "",
        userName: "",
        investmentCtr: "",
        newAmount: "",
        amount: "",
        prevAmount: 0,
      });
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
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Employee Name</label>
          <select
            value={formData.selectedUser}
            onChange={handleUserChange}
            className="w-full border rounded px-3 py-2 text-sm"
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
        <div className="border border-blue-200 p-4 rounded mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Ctr:</label>
            <input
              type="text"
              name="investmentCtr"
              value={formData.investmentCtr}
              onChange={handleChange}
              placeholder="Enter Ctr"
              className="border rounded px-2 py-1 text-sm w-1/2"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">New Amount:</label>
            <input
              type="number"
              name="newAmount"
              value={formData.newAmount}
              onChange={handleAmountChange}
              placeholder="Enter New Amount"
              className="border rounded px-2 py-1 text-sm w-1/2"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Prev Amount:</label>
            <input
              type="text"
              name="prevAmount"
              value={formData.prevAmount}
              disabled
              className="border rounded px-2 py-1 text-sm w-1/2"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Amount:</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              disabled
              placeholder="Calculated Amount"
              className="border rounded px-2 py-1 text-sm w-1/2"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300"
            disabled={isLoading}
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewTaskModal;
