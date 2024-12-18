import React, { useState } from "react";
import { MdLock, MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sellerLogin } from "state/auth/auth";

const SellerLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isSellerLoggingIn, error } = useSelector((state) => state?.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sellerLogin({ email, password }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center  bg-gradient-to-r from-ffafcc via-ffc8dd to-cdb4db">
      <div className="flex w-full max-w-7xl h-[90vh] bg-white shadow-sm rounded-sm overflow-hidden">
        {/* Left Side - Form Section */}
        <div className="lg:w-2/5 w-full lg:p-12 p-3 flex flex-col justify-center">
          <div className="text-3xl font-bold text-black mb-6">
            <span className="bg-gradient-to-r from-ffafcc via-ffc8dd to-cdb4db text-white">B</span>choice
          </div>
          <h2 className="text-4xl font-semibold mb-4">Welcome to BChoice</h2>
          <p className="text-3xl text-black mb-6">Seller</p>
          <h2 className="text-sm font-semibold mb-6">
            Don't have an account yet?{" "}
            <Link to={"/seller signup"} className="text-[#CEB5DB]">
              Create an Account
            </Link>
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4 relative">
              <MdEmail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Phone or Email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#a2d2ff]"
              />
            </div>
            {/* Password Input */}
            <div className="mb-6 relative">
              <MdLock className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#a2d2ff]"
              />
            </div>
            {/* Forgot Password */}
            <div className="mb-6 relative">
              <p className="mt-4 text-[#CEB5DB] cursor-pointer">Forgot password?</p>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-2 rounded-md transition duration-200 ${
                isSellerLoggingIn
                  ? "bg-pink-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-ffafcc via-ffc8dd to-cdb4db hover:bg-gradient-to-tl from-inherit text-pink-700"
              }`}
              disabled={isSellerLoggingIn}
            >
              {isSellerLoggingIn ? "Logging In..." : "Log In"}
            </button>
            {/* Error Message */}
            {error && (
              <div className="mt-4 text-red-500 text-center">
                <p>{error}</p>
              </div>
            )}
          </form>
          <p className="mt-4 text-center text-sm font-semibold mb-6 cursor-pointer">
            Continue as a Buyer{" "}
            <Link to={"/buyerlogin"} className="text-[#CEB5DB]">
              Login Here
            </Link>
          </p>
        </div>

        {/* Right Side - Enlarged Image Section */}
        <div
          className="w-3/5 bg-cover bg-center relative hidden lg:block"
          style={{
            backgroundImage: `url('/auth/seller2.png')`, // Replace with your image path
          }}
        ></div>
      </div>
    </div>
  );
};

export default SellerLoginPage;
