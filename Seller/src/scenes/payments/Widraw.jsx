import React, { useEffect, useState } from "react";
import { CiBank } from "react-icons/ci";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAffilateOrders } from "state/AffilateOrder/ordersForAffilate";

const WithdrawalPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(""); // State for selected method
  const { user } = useSelector((state) => state.auth);
  const [loading,setloading] = useState(false)
  const dispatch = useDispatch();
    // orders for personal ballance 
    const { totalPersonalBalance } = useSelector((state) => state.affilateorders);
    useEffect(() => {
      if (user?._id) {
        // Fetch orders when the dashboard is mounted
        dispatch(fetchAffilateOrders(user._id));
      }
    }, [dispatch, user]);
  const [formData, setFormData] = useState({
    accountHolderName: "",
    phoneNumber: "",
    amount: "",
    bankNumber: "",
    bankName: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, sellerId:user._id });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
  
    try {
      // Validation for required fields
      if (
        !formData.accountHolderName || 
        !selectedMethod || 
        !formData.amount || 
        Number(formData.amount) <= 0
      ) {
        toast.error(
          "Please fill in all required fields, select a method, and ensure the amount is greater than 0."
        );
        return;
      }
      if (formData.amount > totalPersonalBalance) {
        toast.error("Insufficient balance for withdrawal.");
        return;
      }
  
      // Submitting data to the backend
      const payload = {
        ...formData,
        paymentMethod: selectedMethod,
      };
  
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v7/payment/submitrequest/affilate/team`,
        payload
      );
  
      // Show success toast
      toast.success(response.data.message || "Withdrawal request submitted successfully!");
  
      // Refetch personal balance after successful submission
      if (user?._id) {
        dispatch(fetchAffilateOrders(user._id)); // Update Redux state with the latest data
      }
  
      // Reset form state
      setFormData({
        accountHolderName: "",
        phoneNumber: "",
        amount: "",
        bankNumber: "",
        bankName: "",
      });
      setSelectedMethod("");
    } catch (error) {
      // Error handling with toast feedback
      console.error("Error submitting request:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to submit request.");
    } finally {
      setloading(false);
    }
  };
  

  // Function to render input fields based on selected payment method
  const renderInputs = () => {
    switch (selectedMethod) {
      case "Jazzcash":
      case "Easypaisa":
        return (
          <>
            <div className="flex items-center space-x-2 border-b pb-2 font-urbanist">
              <span className="text-gray-600 lg:text-sm text-xs flex-shrink-0">
                Account Holder Name:
              </span>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 border-b pb-2 font-urbanist">
              <span className="text-gray-600 lg:text-sm text-xs flex-shrink-0">
                Account Phone:
              </span>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 border-b pb-2 font-urbanist">
              <span className="text-gray-600 lg:text-sm text-xs flex-shrink-0">
                Amount:
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                
                className="w-full outline-none"
              />
            </div>
          </>
        );

      case "Pakistan Bank":
        return (
          <>
            <div className="flex items-center space-x-2 border-b pb-2 font-urbanist">
              <span className="text-gray-600 lg:text-sm text-xs flex-shrink-0">
                Account Holder Name:
              </span>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 border-b pb-2 font-urbanist">
              <span className="text-gray-600 lg:text-sm text-xs flex-shrink-0">
                Bank Name:
              </span>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 border-b pb-2 font-urbanist">
              <span className="text-gray-600 lg:text-sm text-xs flex-shrink-0">
                Account Number:
              </span>
              <input
                type="text"
                name="bankNumber"
                value={formData.bankNumber}
                onChange={handleChange}
                
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 border-b pb-2 font-urbanist">
              <span className="text-gray-600 lg:text-sm text-xs flex-shrink-0">
                Amount:
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                
                className="w-full outline-none"
              />
            </div>
          </>
        );

      default:
        return <p className="text-gray-600">Select a payment method to continue.</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-2 md:px-8 lg:px-16 py-6 font-urbanist1">
{/* Header */}
<h1 className="text-center text-gray-700 text-sm md:text-lg mb-4">
  Withdraw your balance, it will be sent to your account after confirmation as soon as possiable.
</h1>
      {/* Payment Methods */}
  

{/* Selected Method Information */}
<div className="w-full max-w-4xl mx-auto bg-[#FCF9FE] lg:p-6 p-2 rounded-sm shadow-md mb-6">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full mx-auto  mb-6 px-5 ">
  {[
    { name: "Jazzcash", icon: <img src="https://banner2.cleanpng.com/20180327/zdw/avjcarvs7.webp" alt="Jazzcash" className="max-w-16" /> },
    { name: "Easypaisa", icon: <img src="https://banner2.cleanpng.com/20181113/osf/kisspng-bank-account-pakistan-money-payment-easy-pay-logo-clipart-library-5beb2601143424.9075260015421373450828.jpg" alt="Easypaisa" className="max-w-14" /> },
    { name: "Pakistan Bank", icon: <CiBank size={40} className="text-green-600" /> },
  ].map((method) => (
    <div
      key={method.name}
      className={`flex items-center justify-between bg-[#FCF9FE] lg:p-4 p-2 rounded-lg shadow cursor-pointer ${
        selectedMethod === method.name && "ring-2 ring-blue-500"
      }`}
      onClick={() => setSelectedMethod(method.name)}
    >
      <span className="text-gray-800 font-medium">{method.name}</span>
      <div>{method.icon}</div>
    </div>
  ))}
</div>
  <h2 className="text-gray-800 lg:text-xl text-lg font-bold mb-4">
    {selectedMethod || "Payment Method"}
  </h2>
  <h3 className="text-gray-800 font-semibold mb-4 border-black pr-2 ">
      Your Account Information
    </h3>
  <div className="bg-white p-4 rounded-lg shadow space-y-4">
    <div className="flex items-center gap-3">
    
    <h3 className="text-pink-700 font-medium mb-4">
      Your Account Ballance is PKR.{totalPersonalBalance}
    </h3>
    </div>
    {renderInputs()}
    {/* Withdraw Button */}
    {selectedMethod && (
      <button
  onClick={handleSubmit}
  disabled={loading} // Disable button when loading
  className={`w-full py-2 rounded-lg font-semibold ${
    loading
      ? "bg-gray-400 text-gray-600 cursor-not-allowed" // Disabled state styles
      : "bg-gradient-to-r from-ffafcc via-ffc8dd to-cdb4db text-pink-700" // Normal state styles
  }`}
>
  {loading ? "Withdraw..." : "Withdraw"}
</button>

    )}
  </div>
</div>

{/* Payment Methods */}

</div>
  );
};

export default WithdrawalPage;
