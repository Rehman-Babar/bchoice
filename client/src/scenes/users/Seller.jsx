import React, { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "scenes/products/hooks/EditModal";
import SellerModal from "./SellerModal";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const SellerUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [User, setUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "/api/v2/auth/seller/buyer/admin/users/special"
      );
      setUsers(response.data); // Assuming response.data contains the list of users
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };
  // Fetch users from the API
  useEffect(() => {

    fetchUsers();
  }, []);

      // Function to handle opening the modal with the selected product data
      const handleEditClick = (user) => {
        setUser(user);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        // dispatch(fetchAllProducts());
        setUser(null); // Reset current product when closing
      };

  // Handle loading state
  if (loading) {
    return <div>Loading users...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Filter users with the role 'seller'
  const sellers = users.filter(user => user.role === "seller");

  // Delete a user
  const deleteUser = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this order?");
if (!isConfirmed) {
  toast.info("Order deletion canceled.");
  return;
}
    try {
      await axios.delete(`/api/v2/auth/del/${userId}`);
      setUsers(users.filter(user => user._id !== userId)); // Remove the user from the list
      closeModal();
      toast.success("User deleted successfully")
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user");
    }
  };

  // Change user status (example: change to 'Active' or 'Inactive')
  // const changeStatus = async (userId, currentStatus) => {
  //   try {
  //     const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
  //     await axios.patch(`/api/v2/auth/seller/buyer/admin/users/${userId}`, { status: newStatus });
  //     setUsers(users.map(user => 
  //       user._id === userId ? { ...user, status: newStatus } : user
  //     ));
  //   } catch (err) {
  //     console.error("Failed to change status:", err);
  //     setError("Failed to change status");
  //   }
  // };

  return (
    <>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-0">Seller Users</h1>
      <p className="mb-4">Affiliate Team ({sellers.length})</p>
      {sellers.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Sr #</th>
              <th className="border border-gray-300 p-2">Seller ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{sellers.indexOf(user) + 1}</td>
                <td className="border border-gray-300 p-2">BC {sellers.length - index}</td>
                <td className="border border-gray-300 p-2">{user.fullName}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className={`border border-gray-300 p-2 font-semibold ${user.accessApproved === true ? "text-green-600": "text-red-600"}`}>{user.accessApproved ? "Active": "Panding"}</td>
                <td className="border border-gray-300 p-2 flex space-x-2 items-center justify-center text-sm">
                  <button 
                    onClick={() => deleteUser(user._id)} 
                    className="text-gray-800    "
                  >
                    <MdDelete/>
                  </button>
                  <button 
                    onClick={() => handleEditClick(user)} 
                    className="text-gray-800  "
                  >
                    <FaEdit/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sellers found.</p>
      )}
    </div>
    {isModalOpen && <SellerModal fetchUsers={fetchUsers} handleDel={deleteUser} user={User} closeModal={closeModal} />}
    </>
  );
};

export default SellerUsers;
