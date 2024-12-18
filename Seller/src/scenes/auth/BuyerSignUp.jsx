import React, { useState } from "react";
import Select from "react-select";
import CountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpBuyer } from "state/auth/auth";

const countries = [
  { value: "US", label: <><CountryFlag countryCode="US" svg /> United States</> },
  { value: "CA", label: <><CountryFlag countryCode="CA" svg /> Canada</> },
  { value: "GB", label: <><CountryFlag countryCode="GB" svg /> United Kingdom</> },
  { value: "IN", label: <><CountryFlag countryCode="IN" svg /> India</> },
  { value: "PK", label: <><CountryFlag countryCode="PK" svg /> Pakistan</> },
  { value: "AU", label: <><CountryFlag countryCode="AU" svg /> Australia</> },
  { value: "DE", label: <><CountryFlag countryCode="DE" svg /> Germany</> },
  { value: "FR", label: <><CountryFlag countryCode="FR" svg /> France</> },
  { value: "IT", label: <><CountryFlag countryCode="IT" svg /> Italy</> },
  { value: "JP", label: <><CountryFlag countryCode="JP" svg /> Japan</> },
  { value: "CN", label: <><CountryFlag countryCode="CN" svg /> China</> },
  { value: "ZA", label: <><CountryFlag countryCode="ZA" svg /> South Africa</> },
  { value: "BR", label: <><CountryFlag countryCode="BR" svg /> Brazil</> },
  { value: "RU", label: <><CountryFlag countryCode="RU" svg /> Russia</> },
  { value: "MX", label: <><CountryFlag countryCode="MX" svg /> Mexico</> },
];

const BuyerSignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    country: null,
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const { isBuyerSigningUp, error } = useSelector((state) => state.auth); // Access state from Redux


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, country: selectedOption }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      country: formData.country?.value, // Send only country code
      password: formData.password,
    };

    dispatch(signUpBuyer(payload));
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center  bg-gradient-to-r from-ffafcc via-ffc8dd to-cdb4db">
      <div className="flex w-full max-w-5xl bg-white  rounded-sm overflow-hidden">
        
        {/* Left Side - Form Section */}
        <div className="lg:w-2/3 w-full lg:p-12 p-4">
          <div className="lg:text-3xl text-xl font-bold text-black mb-6">
            <span className=" bg-gradient-to-r from-ffafcc via-ffc8dd to-cdb4db text-white">B</span>choice
          </div>
          <h2 className="lg:text-4xl text-xl font-semibold mb-4">Create Your Account</h2>
          <p className="lg:text-lg text-xs text-gray-600 mb-8">
            Please fill in your details to sign up.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 lg:gap-6 gap-2">
              {/* Full Name */}
              <div className="mb-4">
                <label className="block lg:text-sm text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#CEB5DB]"
                />
              </div>
              
              {/* Phone Number */}
              <div className="mb-4">
                <label className="block lg:text-sm text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#CEB5DB]"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block lg:text-sm text-xs font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#CEB5DB]"
                />
              </div>

              {/* Country Dropdown */}
              <div className="mb-4">
                <label className="block lg:text-sm text-xs font-medium text-gray-600 mb-1">Country</label>
                <Select
                  options={countries}
                  value={formData.country}
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  className="w-full"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block lg:text-sm text-xs font-medium text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#CEB5DB]"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block lg:text-sm text-xs font-medium text-gray-600 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#CEB5DB]"
                />
              </div>
            </div>

            {error && <p className="text-red-500 lg:text-sm text-xs mt-2">{error}</p>}

            <button
              type="submit"
              className={`w-full py-2 mt-4 rounded-md transition duration-200 ${
                isBuyerSigningUp
                  ? "bg-pink-300 text-white cursor-not-allowed"
                  : " bg-gradient-to-r from-ffafcc via-ffc8dd to-cdb4db text-pink-700 hovsm: bg-gradient-to-tl from-inherit"
              }`}
            >
              {isBuyerSigningUp ? "Processing..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-3 font-semibold">
            Already have an account?{" "}
            <Link className="text-[#CEB5DB] hover:text-[#ba85d6]" to={'/buyerlogin'}>
              Login Here
            </Link>
          </p>
        </div>

        {/* Right Side - Placeholder Image Section */}
        <div
          className="w-2/5 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: `url('/auth/seller2.png')`, // Replace with your image path
          }}
        ></div>
      </div>
    </div>
  );
};

export default BuyerSignUpPage;
