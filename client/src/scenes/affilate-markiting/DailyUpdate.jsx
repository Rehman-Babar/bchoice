import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";

const DailyUpdate = () => {
  const { user } = useSelector((state) => state.auth); // Assuming user contains sellerId and sellerName

  const [updates, setUpdates] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ date: "", description: "" });
  const [loading, setLoading] = useState(false);
  

  // Fetch updates from the backend
  const fetchUpdates = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v6/dailyupdate/get/all/ceo`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        console.log(data)
        setUpdates(data); // Set updates from the backend
      } else {
        console.error("Failed to fetch updates");
      }
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };

  // Fetch updates on component mount
  useEffect(() => {
    fetchUpdates();
  }, []);

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!user?._id || !user?.fullName) {
      alert("User information is missing. Please log in.");
      return;
    }

    const updateData = {
      userDate: newUpdate.date,
      description: newUpdate.description,
      sellerId: user._id,
      sellerName: user.fullName,
    };
    console.log(updateData);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v6/dailyupdate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Updated data successfully");

        // After submitting, fetch the updated list of updates
        fetchUpdates();

        setShowAddModal(false);
        setNewUpdate({ date: "", description: "" });
        // console.log("Result:", result); // Optionally handle the response
      } else {
        alert("Failed to submit the update. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting update:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = (mongoDate) => {
    const date = new Date(mongoDate);
    return date.toLocaleString("en-US", {
      year: "2-digit", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit", 
      hour12: true
    });
  };

  return (
    <div className="p-4 bg-white min-h-screen border border-gray-300 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="lg:text-lg text-sm font-bold">Daily Updates</h2>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-[#FCF9FE] text-gray-700 lg:text-sm text-[7px] border-b border-gray-300">
      <th className="lg:px-4 lg:py-2 px-2 py-1 border-r border-gray-300">Sr#</th>
      <th className="lg:px-4 lg:py-2 px-2 py-1 border-r border-gray-300">UserName</th>
      <th className="lg:px-4 lg:py-2 px-2 py-1 border-r border-gray-300">Description</th>
      <th className="lg:px-4 lg:py-2 px-2 py-1 border-r border-gray-300">Date</th>
      <th className="lg:px-4 lg:py-2 px-2 py-1">View</th>
    </tr>
  </thead>
  <tbody>
    {updates.map((update, index) => (
      <tr
        key={index}
        className={`${
          index % 2 === 0 ? "bg-[#FCF9FE]" : "bg-white"
        } lg:text-sm text-[7px] border-b border-gray-300`}
      >
        <td className="lg:px-4 lg:py-2 px-2 py-1 text-center border-r border-gray-300">{index + 1}</td>
        <td className="lg:px-4 lg:py-2 px-2 py-1 text-center border-r border-gray-300">{update.sellerName}</td>
        <td className="lg:px-4 lg:py-2 px-2 py-1 whitespace-pre-line border-r border-gray-300">
          
          {update.description.split(" ").slice(0, 4).join(" ")}{" "}
          {update.description.split(" ").length > 4 && "..."}
        </td>
        <td className="lg:px-4 lg:py-2 px-2 py-1 border-r">{formattedDate(update.userDate)}</td>
        <td className="lg:px-4 lg:py-2 px-2 py-1 text-center">
          <button
            onClick={() => {
              setSelectedUpdate(update);
              setShowViewModal(true);
            }}
            className="text-gray-800 px-2 py-1 rounded hover:text-gary-600"
          >
            <FaEye />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      <button
     onClick={() => setShowAddModal(true)}
    className="fixed bottom-4 right-4 bg-[#A95FB8] text-white rounded-full lg:w-12 lg:h-12 w-8 h-8 flex items-center justify-center shadow-lg hover:[#A99FB1]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="lg:w-6 lg:h-6 w-3 h-3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>

      {/* View Modal */}
      {showViewModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-sm p-6 w-96 ">
      <h3 className="lg:text-lg text-sm font-bold mb-4">View Update</h3>
      <p>
        <strong>Date:</strong> {formattedDate(selectedUpdate?.userDate)}
      </p>
      <p>
        <strong>UserName:</strong> {selectedUpdate.sellerName}
      </p>
      <div className="mt-2 lg:text-base text-xs whitespace-pre-line overflow-y-auto h-64">
        <strong>Description:</strong> {selectedUpdate?.description}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowViewModal(false)}
          className="bg-gray-300 text-gray-700 lg:px-4 lg:py-2 px-2 py-1 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Add New Update</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Date & Time</label>
              <input
                type="datetime-local"
                value={newUpdate.date}
                onChange={(e) =>
                  setNewUpdate({ ...newUpdate, date: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                value={newUpdate.description}
                onChange={(e) =>
                  setNewUpdate({ ...newUpdate, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-end items-center">
              {loading ? (
                <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 mr-4"></div>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white lg:px-4 lg:py-2 px-2 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Submit
                </button>
              )}
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-300 text-gray-700 lg:px-4 lg:py-2 px-2 py-1 rounded hover:bg-gray-400"
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

export default DailyUpdate;
