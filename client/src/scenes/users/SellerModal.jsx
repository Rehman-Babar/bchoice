import React from 'react'
import NavItemsPage from './SellerCheckBox';

const SellerModal = ({ user, closeModal,handleDel, fetchUsers }) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
        <div className="relative p-6 w-full h-[70%] max-w-2xl bg-white rounded-lg shadow-lg overflow-y-scroll">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Edit Affiliate</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <div className=" space-y-3 mt-2 grid grid-cols-2 space-x-2">
            <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
              <span className="font-semibold text-gray-700">Full Name:</span>
              <span className="text-gray-600">{user.fullName}</span>
            </div>
            <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-600">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
              <span className="font-semibold text-gray-700">Country:</span>
              <span className="text-gray-600">{user.country || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
              <span className="font-semibold text-gray-700">Phone Number:</span>
              <span className="text-gray-600">{user.phoneNumber || 'N/A'}</span>
            </div>
            {user.role && (
              <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
                <span className="font-semibold text-gray-700">Role:</span>
                <span className="text-gray-600 capitalize">{user.role}</span>
              </div>
            )}
            {user.profession && (
              <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
                <span className="font-semibold text-gray-700">Profession:</span>
                <span className="text-gray-600">{user.profession}</span>
              </div>
            )}
            {user.portfolio && user.portfolio.length > 0 && (
              <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
                <span className="font-semibold text-gray-700">Portfolio:</span>
                <span className="text-gray-600">{user.portfolio.join(', ')}</span>
              </div>
            )}
            {user.description && (
              <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
                <span className="font-semibold text-gray-700">Description:</span>
                <span className="">{user.description}</span>
              </div>
            )}
            
              <div className="flex items-center gap-2 shadow-lg rounded-md p-4" >
                <span className="font-semibold text-gray-700">Status:</span>
                <span className={`text-gray-600 ${user.accessApproved === true ? "text-green-600": "text-red-600"}`}>{user.accessApproved ? "Active": "Panding"}</span>
        </div>
          </div>
          <NavItemsPage fetchUsers={fetchUsers} handleDel={handleDel} closeModal={closeModal} user={user}/>
        </div>
      </div>
    </div>
  )
}

export default SellerModal;
