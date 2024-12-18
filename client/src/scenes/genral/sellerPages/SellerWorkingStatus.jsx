import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const SellerWorkingStatus = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for modal
  const [selectedStatus, setSelectedStatus] = useState(""); // Track selected status in modal

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "/api/v2/auth/seller/buyer/admin/users/special"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle status update
  const updateStatus = async () => {
    if (!selectedUser || !selectedStatus) return;
    console.log(selectedStatus, selectedUser._id);
  
    try {
      const response = await axios.post(
        `/api/v2/auth/seller/update/workig/status/${selectedUser._id}`,
        { workingStatus: selectedStatus }
      );
      if( response.status === '200' ){
        console.log("Status updated successfully");
        toast.success("Status updated successfully!");
      }

      setUsers(users.map(user =>
        user._id === selectedUser._id ? { ...user, workingStatus: selectedStatus } : user
      ));
  
      setSelectedUser(null); // Close the modal
      setSelectedStatus(""); // Reset selected status
    } catch (err) {
      console.error("Failed to update status:", err);
      setError("Failed to update status");
    }
  };
  

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const sellers = users.filter(user => user.role === "seller");

  return (
    <>
    <div className="p-4 h-[40vh] overflow-y-scroll border">
      <h1 className="text-2xl font-bold mb-4">Seller Users</h1>
      {sellers.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 text-[7px] shadow md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 lg:p-2 p-1">Sr</th>
              <th className="border border-gray-300 lg:p-2 p-1">Name</th>
              <th className="border border-gray-300 lg:p-2 p-1">Role</th>
              <th className="border border-gray-300 lg:p-2 p-1">Working Status</th>
              <th className="border border-gray-300 lg:p-2 p-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 lg:p-2 p-1">{index + 1}</td>
                <td className="border border-gray-300 lg:p-2 p-1">{user.fullName}</td>
                <td className="border border-gray-300 lg:p-2 p-1">{user.role}</td>
                <td
                  className={`border border-gray-300 lg:p-2 p-1 font-semibold ${
                    user.workingStatus ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.workingStatus}
                </td>
                <td className="border border-gray-300 lg:p-2 p-1">
                  <FaEdit
                    className="text-gray-500 hover:text-blue-500 cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                      setSelectedStatus(user.workingStatus); // Pre-select the current status
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sellers found.</p>
      )}

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Status</h2>
            <div className="flex flex-col space-y-2">
  {["Excellent","Good", "Poor", "Very Poor"].map((status) => (
    <label key={status} className="flex items-center space-x-2">
      <input
        type="radio" // Change from checkbox to radio
        name="workingStatus"
        checked={selectedStatus === status}
        onChange={() => setSelectedStatus(status)}
      />
      <span>{status}</span>
    </label>
  ))}
</div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setSelectedUser(null)} // Close modal
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={updateStatus}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* line */}
      
    </div>
    <hr className="border-black mt-5" />
    </>
  );
};

export default SellerWorkingStatus;
