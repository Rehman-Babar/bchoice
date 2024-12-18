import React, { useState, useEffect } from "react";
import axios from "axios";

const BulkPaymentModal = ({ isOpen, onClose, users, investments, fetchInvestments }) => {
  const [formDataList, setFormDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize form data for each user
    if (users) {
      const initialData = users.map((user) => {
        const matchingInvestments = investments.filter(
          (inv) => inv.userName === user.fullName
        );
        const totalInvestment = matchingInvestments.reduce(
          (sum, inv) => sum + (inv.investmentAmount || 0),
          0
        );

        return {
          userId: user._id,
          userName: user.fullName,
          investmentCtr: "",
          newAmount: "",
          subtractAmount: "",
          amount: totalInvestment,
          prevAmount: totalInvestment,
        };
      });
      setFormDataList(initialData);
    }
  }, [users, investments]);

  const handleAmountChange = (index, value) => {
    const updatedFormData = [...formDataList];
    const parsedValue = parseFloat(value) || 0;
    updatedFormData[index].newAmount = parsedValue;
    updatedFormData[index].subtractAmount = "";
    updatedFormData[index].amount = updatedFormData[index].prevAmount + parsedValue;
    setFormDataList(updatedFormData);
  };

  const handleSubtractChange = (index, value) => {
    const updatedFormData = [...formDataList];
    const parsedValue = parseFloat(value) || 0;
    updatedFormData[index].subtractAmount = parsedValue;
    updatedFormData[index].newAmount = "";
    updatedFormData[index].amount = updatedFormData[index].prevAmount - parsedValue;
    setFormDataList(updatedFormData);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFormData = [...formDataList];
    updatedFormData[index][field] = value;
    setFormDataList(updatedFormData);
  };

  const handleSubmitAll = async () => {
    const validForms = formDataList.filter(
      (form) => form.investmentCtr && (form.newAmount || form.subtractAmount)
    );

    if (validForms.length === 0) {
      alert("Please fill in all required fields for at least one user.");
      return;
    }

    setIsLoading(true);
    try {
      await Promise.all(
        validForms.map((formData) =>
          axios.post(`${process.env.REACT_APP_BASE_URL}/api/v8/invest/send`, {
            sellerId: formData.userId,
            userName: formData.userName,
            investmentCtr: formData.investmentCtr,
            investmentAmount: formData.amount,
          })
        )
      );
      fetchInvestments();
      alert("Bulk payments successfully submitted!");
      onClose();
    } catch (error) {
      console.error("Error submitting bulk payments:", error);
      alert("Failed to submit bulk payments.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-y-scroll items-center z-50">
      <div className="bg-white shadow-lg p-6 w-full max-w-3xl max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#ff4560]">Bulk Payments</h2>
          <button onClick={onClose} className="text-sm bg-gray-200 px-3 py-1">
            Close
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {formDataList.map((formData, index) => (
              <div
                key={formData.userId}
                className="border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <h3 className="font-medium text-sm mb-2 text-[#ff4560]">
                  {formData.userName}
                </h3>
                <div className="mb-3">
                  <label className="block text-xs font-medium">New Amount:</label>
                  <input
                    type="number"
                    value={formData.newAmount}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    className="w-full border px-2 py-1 text-sm"
                    placeholder="Enter New Amount"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-medium">Subtract:</label>
                  <input
                    type="number"
                    value={formData.subtractAmount}
                    onChange={(e) => handleSubtractChange(index, e.target.value)}
                    className="w-full border px-2 py-1 text-sm"
                    placeholder="Enter Subtraction Amount"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-medium">Ctr:</label>
                  <input
                    type="text"
                    value={formData.investmentCtr}
                    onChange={(e) => handleInputChange(index, "investmentCtr", e.target.value)}
                    className="w-full border px-2 py-1 text-sm"
                    placeholder="Enter Ctr"
                  />
                </div>
                <p className="text-xs mb-3">
                  Total Amount:{" "}
                  <span className="text-[#ff4560]">{formData.amount} PKR</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmitAll}
            className="px-6 py-2 bg-[#ff4560] text-white text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit All"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkPaymentModal;
