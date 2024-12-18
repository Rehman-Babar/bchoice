import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatMemberSinceDate } from "utils/date";
import { FaEye, FaEdit } from "react-icons/fa";

const BCSupport = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState("");

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v4/complaints/get/all/ceo`
      );
      if (response.status === 200) {
        setComplaints(response.data);
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

  const updateComplaint = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v4/complaints/${selectedComplaint._id}/status`,
        { solution, status }
      );
      if (response.status === 200) {
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint._id === selectedComplaint._id
              ? { ...complaint, solution, status }
              : complaint
          )
        );
        console.log("Complaint updated successfully");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating complaint:", error.message);
    } finally {
      setEditModalOpen(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Solved":
        return "bg-[#16a34a] text-white";
      case "Pending":
        return "bg-[#ff3131] text-white";
      case "Issued":
        return "bg-[#b03434] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setModalOpen(true);
  };

  const openEditModal = (complaint) => {
    setSelectedComplaint(complaint);
    setSolution(complaint.solution || "");
    setStatus(complaint.status || "Pending");
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedComplaint(null);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="lg:p-4 p-0 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-sm lg:p-3 p-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">All Complaints</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border">
            <thead>
              <tr className="bg-[#FCF9FE] border-b">
                <th className="text-left lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] font-medium text-gray-600 border-r">
                  Complaint ID
                </th>
                <th className="text-left lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] font-medium text-gray-600 border-r">
                  UserName
                </th>
                <th className="text-left lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] font-medium text-gray-600 border-r">
                  Title
                </th>
                <th className="text-left lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] hidden lg:table-cell font-medium text-gray-600 border-r">
                  Complaint
                </th>
                <th className="text-left lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] font-medium text-gray-600 border-r">
                  Status
                </th>
                <th className="text-left lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] hidden lg:table-cell font-medium text-gray-600 border-r">
                  Resolve Time (Days)
                </th>
                <th className="text-center lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={complaint._id} className="border-b">
                  <td className="lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] text-gray-700 border-r">
                    BC {index + 1}
                  </td>
                  <td className="lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] text-gray-700 border-r">
                    {complaint.sellerName}
                  </td>
                  <td className="lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] text-gray-700 border-r">
                    {complaint.title}
                  </td>
                  <td className="lg:px-4 lg:py-2 px-1 py-1 lg:text-sm hidden lg:table-cell  text-[8px] text-gray-700 border-r">
                    {complaint.complaint.split(" ").slice(0, 8).join(" ")}{" "}
                    {complaint.complaint.split(" ").length > 8 && "..."}
                  </td>
                  <td className="lg:px-4 lg:py-2 px-1 py-1 lg:text-sm text-[8px] text-gray-700 border-r">
                    <span
                      className={`px-2 py-1 rounded-full ${getStatusClass(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="lg:px-4 lg:py-2 px-1 py-1 hidden lg:table-cell lg:text-sm text-[8px] text-gray-700 border-r">
                    {calculateResolveWithinDay(complaint)}
                  </td>
                  <td className="text-center flex justify-center gap-2">
                    <button
                      className="text-gray-800 hover:text-gray-500 lg:text-base text-[8px] p-2 rounded-full"
                      onClick={() => openModal(complaint)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-gray-800 hover:text-gray-500 lg:text-base text-[8px] p-2 rounded-full"
                      onClick={() => openEditModal(complaint)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
      {editModalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Complaint</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Enter solution..."
            ></textarea>
            <div className="mb-4">
              <label className="block mb-2">
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={status === "Pending"}
                  onChange={(e) => setStatus(e.target.value)}
                />{" "}
                Pending
              </label>
              <label className="block mb-2">
                <input
                  type="radio"
                  name="status"
                  value="Solved"
                  checked={status === "Solved"}
                  onChange={(e) => setStatus(e.target.value)}
                />{" "}
                Solved
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value="Issued"
                  checked={status === "Issued"}
                  onChange={(e) => setStatus(e.target.value)}
                />{" "}
                Issued
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={updateComplaint}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Submit
              </button>
              <button
                onClick={closeEditModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BCSupport;
