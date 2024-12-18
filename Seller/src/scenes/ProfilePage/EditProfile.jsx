import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border rounded p-2"
            defaultValue="Adrian Allan"
          />
          <input
            type="file"
            className="w-full border rounded p-2"
          />
          <textarea
            placeholder="Details"
            className="w-full border rounded p-2 overflow-y-scroll"
            rows="4"
            defaultValue="Duis felis ligula, pharetra at nisl sit amet, ullamcorper fringilla mi. Cras luctus metus non enim porttitor sagittis."
          ></textarea>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Country"
              className="border rounded p-2"
              defaultValue="California"
            />
            <input
              type="text"
              placeholder="Birthday Date"
              className="border rounded p-2"
              defaultValue="03/19/1980"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Mail"
              className="border rounded p-2"
              defaultValue="adrianallan@gmail.com"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border rounded p-2"
              defaultValue="202-555-0174"
            />
          </div>
          <textarea
            placeholder="Address"
            className="w-full border rounded p-2"
            rows="2"
            defaultValue="2734 West Fork Street, EASTON 02334"
          ></textarea>
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

export default EditProfileModal;
