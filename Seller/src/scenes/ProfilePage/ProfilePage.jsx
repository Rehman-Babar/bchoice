import React, { useState } from 'react';
import { FaEdit, FaCreditCard, FaBell, FaEnvelope, FaEyeSlash, FaEye } from 'react-icons/fa';
import EditProfileModal from './EditProfile';
import EditAuthenticationModal from './EditAuthenticationModal';
import { useSelector } from 'react-redux';

const ProfilePage = () => {

    const { user } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Seller Profile</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="bg-[#FCF9FE] rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <div className="flex items-center mb-4">
            <img
              src={user.image}
              alt="Admin"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <p className="font-bold text-lg">{user.fullName}</p>
              <p className="text-sm text-gray-600">{user?.userName}</p>

              <p className="text-sm text-gray-600">22 years, Pakistan</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Duis felis ligula, pharetra at nisl sit amet, ullamcorper fringilla
            mi. Cras luctus metus non enim porttitor sagittis.???
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>📞 {user.phoneNumber}</li>
            <li>✉️ {user.email}</li>
            <li>🎂 19/03/1980 ????</li>
            <li>🏠 {user.exactLocation}</li>
          </ul>
          <button
  className="mt-4 bg-[#FCD8E1] text-pink-600 hover:underline px-4 py-2 rounded inline-flex items-center"
  onClick={() => setIsModalOpen(true)}
>
  <FaEdit className="mr-2" /> Edit Profile
</button>

<EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </div>

        {/* Profile Settings */}
        <div className="lg:col-span-2 bg-[#FCF9FE] rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="User Name"
              value={user.fullName}
              className="border rounded p-2"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border rounded p-2 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <input
              type="text"
              placeholder="Company Name * ????"
            //   value={user.co}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Contact Person ????"
              className="border rounded p-2"
            />
            <textarea
              placeholder="Address "
              className="border rounded p-2 col-span-1 md:col-span-2"
              value={user.exactLocation}
            ></textarea>
            <input
              type="email"
              placeholder="Email *"
              value={user.email}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Website URL ???"
              className="border rounded p-2"
            />
            <select className="border rounded p-2" value={user.country}>
              <option>United States</option>
              <option>India</option>
              <option>Pakistan</option>
            </select>
            <input
              type="text"
              placeholder="State/Province ????"
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="City ????"
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Postal Code ????"
              className="border rounded p-2"
            />
          </form>
          <button className="mt-4 bg-[#FCD8E1] text-pink-600 hover:underline px-4 py-2 rounded">
            Save
          </button>
        </div>

        {/* Payment Method */}
        <div className="bg-[#FCF9FE] rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <div className="flex items-center mb-4">
            <FaCreditCard className="text-2xl mr-2 text-gray-600" />
            <p className="text-gray-600">Visa ********7548</p>
          </div>
          <p className="text-gray-600">Next billing charged $48</p>
          <p className="text-sm text-gray-500">Autopay on July 20, 2021</p>
          <button className="mt-4 bg-[#FCD8E1] text-pink-600 hover:underline px-4 py-2 rounded">
            Add Payment Info
          </button>
        </div>

        {/* Notification Preferences */}
        <div className="bg-[#FCF9FE] rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              <FaBell className="inline mr-2" /> Activity Notifications
            </li>
            <li>
              <FaEnvelope className="inline mr-2" /> Email Preferences
            </li>
          </ul>
        </div>

        {/* Authentication Details */}
        <div className="bg-[#FCF9FE] rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Authentication Details</h2>
          <ul className="text-gray-600 space-y-2">
            <li>User Name: {user.userName}</li>
            <li>Login Password: Abc*******</li>
            <li>Last Password Change: 3 Months Ago</li>
          </ul>
          <button
        onClick={() => setAuthModalOpen(true)}
        className="flex items-center mt-4 bg-[#FCD8E1] text-pink-600  px-4 py-2 rounded hover:underline"
      >
        <FaEdit className="mr-2" />
        Edit Authentication
      </button>

      {/* Authentication Modal */}
      <EditAuthenticationModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
