import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const EditAuthenticationModal = ({ isOpen, onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Authentication</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form className="space-y-4">
          <div className='flex items-center justify-center gap-2'>
          <div>
            <label className="block text-sm font-medium mb-1">User Name</label>
            <input
              type="text"
              placeholder="User Name"
              className="w-full border rounded p-2"
              defaultValue="Adrian007"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded p-2 pr-10"
              defaultValue="password123"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border rounded p-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-500"
            >
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Done
            </button>
            <button
              type="submit"
              className="bg-[#FCD8E1] text-pink-600 px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAuthenticationModal;
