import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatMemberSinceDate } from "utils/date";

const BCSupport = () => {
  const location = useLocation();
  const orderId = location.state?.orderId; // Access the passed orderId
  const navigate = useNavigate();


  const clearOrderId = () => {
    // Navigate to the same path but with an empty state
    navigate(location.pathname, { replace: true, state: {} });
  };
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility state
  const [createModalOpen, setCreateModalOpen] = useState(orderId ? true :false); // Modal for creating complaints
  const [selectedComplaint, setSelectedComplaint] = useState(null); // State to store selected complaint details
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [complaints, setComplaints] = useState([]); //
  const [complaintData, setComplaintData] = useState({
    title: "" || orderId,
    complaint: "",
    sellerId:user?._id,
    sellerName:user?.fullName
  });

 
  const fetchComplants = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v4/complaints/seller/${user?._id}`
      );
      if (response.status === 200) {
        setComplaints(response.data); // Populate complaints data
        console.log(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error.message);
    }
  };
  const calculateResolveWithinDay = (complaint) => {
    if (!complaint.updatedAt || complaint.status !== "Solved") {
      return "Not Yet resolved";
    }
    const createdAt = new Date(complaint.createdAt);
    const updatedAt = new Date(complaint.updatedAt);
    const diffInHours = (updatedAt - createdAt) / (1000 * 60 * 60);

    return diffInHours < 24
      ? "0"
      : `${Math.floor(diffInHours / 24)}`; // Convert to days
  };  
  
  // Call the function inside useEffect or when needed
  useEffect(() => {
    fetchComplants();
  }, []);
  
  // Function to get status-specific styles
  const getStatusClass = (status) => {
    switch (status) {
      case "Solved":
        return "bg-[#16a34a] text-white"; // Green
      case "Pending":
        return "bg-[#ff3131] text-white"; // Red
      case "Issued":
        return "bg-[#b03434] text-white"; // Dark Red
      default:
        return "bg-gray-500 text-white"; // Default Grey
    }
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint); // Set selected complaint details
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setSelectedComplaint(null); // Reset selected complaint
  };

  const openCreateModal = () => {
    setCreateModalOpen(true); // Open the create complaint modal
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false); // Close the create complaint modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Make POST request to backend (use appropriate API URL)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v4/complaints/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Complaint created successfully!");
        // rest
        complaintData.title = "";
        complaintData.complaint = "";
        clearOrderId();
        closeCreateModal();
        fetchComplants()
      } else {
        alert("Error creating complaint: " + result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:p-4 p-1 bg-gray-50 min-h-screen">
<div className="bg-white rounded-sm p-3">
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-lg font-semibold">All Complaints</h1>
  </div>

  {/* Responsive Table Container */}
  <div className="overflow-x-auto">
  <table className="min-w-full border-collapse border">
  <thead>
    <tr className="bg-[#FCF9FE] border-b">
      <th className="text-left lg:px-4 lg:py-2 px-2 py-1 lg:text-sm text-[5px] font-medium text-gray-600 border-r">
        Sr#
      </th>
      <th className="text-left lg:px-4 lg:py-2 px-2 py-1 lg:text-sm hidden lg:table-cell text-[5px] font-medium text-gray-600 border-r">
        UserName
      </th>
      <th className="text-left lg:px-4 lg:py-2 px-2 py-1 lg:text-sm text-[5px] font-medium text-gray-600 border-r">
        Title
      </th>
      <th className="text-left lg:px-4 lg:py-2 px-2 py-1 hidden lg:table-cell lg:text-sm text-[5px] font-medium text-gray-600 border-r">
        Complaint
      </th>
      <th className="text-left lg:px-4 lg:py-2 px-2 py-1 hidden lg:table-cell lg:text-sm text-[5px] font-medium text-gray-600 border-r">
        Solution
      </th>
      
      <th className="text-left lg:px-4 lg:py-2 px-2 py-1 lg:text-sm text-[5px] font-medium text-gray-600 border-r">
        Status
      </th>
      <th className="text-left lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[5px] font-medium text-gray-600 border-r">
        Resolve Time (Days)
      </th>
      <th className="text-left lg:px-4 lg:py-2 px-2 py-1 lg:text-sm text-[5px] font-medium text-gray-600 border-r">
        Date
      </th>
      <th className="text-left lg:px-4 lg:py-2 px-2 py-1 lg:text-sm text-[5px] font-medium text-gray-600">
        View
      </th>
    </tr>
  </thead>
  <tbody>
    {complaints.map((complaint, index) => (
      <tr key={index} className="border-b">
        <td className="lg:px-4 lg:py-2 lg:text-sm px-1 py-1 text-[5px] text-gray-700 border-r">
          {index + 1}
        </td>
        <td className="lg:px-4 lg:py-2 lg:text-sm px-2 hidden lg:table-cell py-1 text-[5px]  text-gray-700 border-r">
          {complaint.sellerName}
        </td>
        <td className="lg:px-4 lg:py-2 lg:text-sm px-1 py-1 text-[5px] text-gray-700 border-r">
          {complaint.title}
        </td>
        <td className="lg:px-4 lg:py-2 lg:text-sm px-2 py-1 text-[5px] hidden lg:table-cell text-gray-700 border-r">
          {complaint?.complaint.split(" ").slice(0, 4).join(" ")}{" "}
          {complaint?.complaint.split(" ").length > 4 && "..."}
        </td>
        
        <td className="lg:px-4 lg:py-2 lg:text-sm px-2 py-1 hidden lg:table-cell text-[5px] text-gray-700 border-r">
          {complaint?.solution?.split(" ").slice(0, 3).join(" ")}{" "}
          {complaint?.solution?.split(" ").length > 3 && "..."}
        </td>
        
        <td className="px-4 py-2 border-r">
          <span
            className={`px-2 py-1 lg:text-sm text-[5px] rounded-sm ${getStatusClass(
              complaint.status
            )}`}
          >
            {complaint.status}
          </span>
        </td>
        <td className="lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] text-gray-700 border-r">
          {calculateResolveWithinDay(complaint)}
        </td>
        <td className="lg:px-4 lg:py-2 lg:text-sm px-2 py-1 text-[5px] text-gray-700 border-r">
          {formatMemberSinceDate(complaint.createdAt)}
        </td>
        <td className=" text-center">
          <button
            className="text-gray-800 hover:bg-blue-100 lg:text-base text-[5px] p-2 rounded-sm"
            onClick={() => openModal(complaint)}
          >
            <FaEye />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  </div>
  <button
    onClick={openCreateModal}
    className="fixed bottom-4 right-4 bg-[#A95FB8] text-white rounded-sm w-12 h-12 flex items-center justify-center shadow-lg hover:[#A99FB1]"
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

      {/* View Complaint Modal */}
      {modalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-2 border-b">
            <strong>Status:</strong> {selectedComplaint.title}
            </h2>
            <p className="mb-4 border-b ">
              <strong>Status:</strong> {selectedComplaint.status}
            </p>
            <p className="mb-4 border-b max-h-40 overflow-y-scroll">
              <strong>Complaint:</strong> {selectedComplaint.complaint}
            </p>
            <p className="mb-4 border-b max-h-40 overflow-y-scroll">
              <strong>Solution:</strong> {selectedComplaint.solution}
            </p>
            <p className="mb-4 border-b ">
              <strong>Resolve Time (Days):</strong> {calculateResolveWithinDay(selectedComplaint)}
            </p>
            <p className="mb-4 border-b ">
              <strong>Date:</strong>{formatMemberSinceDate(selectedComplaint.createdAt)}
            </p>
            <button
              onClick={closeModal}
              className="text-red-500 bg-red-100 p-2 rounded-sm"
            >
              Close
            </button>
          </div>

        </div>
      )}

      {/* Create Complaint Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-2">Create Complaint</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          name="title"
          value={complaintData.title }
          onChange={handleInputChange}
          required
          disabled={!!orderId} // Disable the field if orderId is present
          className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Complaint
                </label>
                <textarea
                  name="complaint"
                  value={complaintData.complaint}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                  rows="4"
                ></textarea>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#A95FB8] text-white p-2 rounded-md hover:bg-pink-600"
                >
                  {loading ? "Creating..." : "Create Complaint"}
                </button>
                <button
                  onClick={closeCreateModal}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BCSupport;
