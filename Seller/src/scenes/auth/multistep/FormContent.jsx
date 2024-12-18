import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowSuccessModal, submitSellerRequest } from "state/auth/auth";
// import {setShowSuccessModal} from "state/auth/auth.js"

const FormContent = ({ currentStep, nextStep, prevStep, onFormDataChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const dispatch = useDispatch()
  // const { showSuccessModal } = useSelector(
  //   (state) => state.auth
  // );
  const dispatch = useDispatch();
  const { isSellerRequesting, showSuccessModal } = useSelector((state) => state?.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    password: "",
    confirmPassword: "",
    profession: "",
    image: null,
    userName: "",
    fatherName:"",
    exactLocation: "",
    cnic: ""
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setFormData({ ...formData, image: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFormData({ ...formData, profession: option });
    setDropdownOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFormData({ ...formData, image: file });
    }
  };
  const handleAdditionalInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        toast.error(`Passwords do not match`);
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        toast.error(`Password must be at least 6 characters long`);
        setLoading(false);
        return;
      }

      // setError(""); // Clear errors

      let imageBase64 = null;
      if (formData.image) {
        const reader = new FileReader();
        const fileReadPromise = new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
        });
        reader.readAsDataURL(formData.image);
        imageBase64 = await fileReadPromise;
      }
        // Validation: Check if the portfolio array is empty
        

      const submissionData = {
        ...formData,
        // portfolio: formData.portfolio.filter((link) => link), // Remove empty links
        image: imageBase64,
      };

      // Dispatch the submitSellerRequest action
    dispatch(submitSellerRequest(submissionData));
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const closeModal = () => {
    dispatch(setShowSuccessModal(false)); // Close the modal
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="h-[27rem] lg:pl-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Info</h2>
            <p className="text-gray-500 mb-6">Please provide your details below.</p>

            <form className="grid grid-cols-2 sm:grid-cols-2 gap-4 mx-auto space-y-3 sm:space-y-0">
  {/* Full Name */}
                  <div>
                    <label className="block lg:text-sm text-xs mt-[9px] md:mt-[2px] lg:mt-0  text-gray-600">User Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Stephen123"
                      name="userName"
                      value={formData.userName || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-[9px] md:mt-[2px] lg:mt-0"
                    />  
                  </div>

                  {/* Email Address */}
                  <div className="">
                    <label className="block lg:text-sm  text-gray-600">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. stephenking@lorem.com"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2  rounded-md"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block lg:text-sm  text-gray-600">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 234 567 890"
                      name="phoneNumber"
                      value={formData.phoneNumber || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block lg:text-sm  text-gray-600">Country</label>
                    <input
                      type="text"
                      placeholder="e.g. United States"
                      name="country"
                      value={formData.country || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block lg:text-sm  text-gray-600">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block lg:text-sm  text-gray-600">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      name="confirmPassword"
                      value={formData.confirmPassword || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md"
                    />
                  </div>
                </form>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        );
    
      case 2:
        return (
          <div className="h-[27rem] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profession</h2>
            
            <p className="text-gray-500 mb-6">{selectedOption ? `You select ${selectedOption}`:"Please select your profession from the dropdown below."}</p>
            <button
              onClick={toggleDropdown}
              className="text-white bg-[#A95FB8] hover:bg-purple-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              {selectedOption || "Select Profession"}
              <svg
                className="w-2.5 h-2.5 ml-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 mt-2">
                <ul className="p-3 space-y-1 text-sm text-gray-700">
                  {[
                    "Seller",
                    "Affiliate Marketer",
                  ].map((option, idx) => (
                    <li key={idx}>
                      <div
                        className="flex p-2 rounded hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionSelect(option)}
                      >
                        <input
                          type="radio"
                          name="profession"
                          value={option}
                          checked={selectedOption === option}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          readOnly
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {option}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
    
      case 3:
        return (
          <div className="h-[27rem]">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Details</h2>
          <p className="text-gray-500 mb-4">Please provide your personal details below.</p>
    
          {/* Additional Inputs */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
              FullName
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleAdditionalInputChange}
              placeholder="Enter your full name"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
    
          <div className="mb-4">
            <label htmlFor="fatherName" className="block text-gray-700 font-medium mb-2">
              Father Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName || ""}
              onChange={handleAdditionalInputChange}
              placeholder="Enter your father's name"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
    
          <div className="mb-4">
            <label htmlFor="cnic" className="block text-gray-700 font-medium mb-2">
              CNIC Number
            </label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              value={formData.cnic || ""}
              onChange={handleAdditionalInputChange}
              placeholder="Enter your CNIC number"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
    
          <div className="mb-4">
            <label htmlFor="exitLocation" className="block text-gray-700 font-medium mb-2">
              Exact Location
            </label>
            <input
              type="text"
              id="exactLocation"
              name="exactLocation"
              value={formData.exactLocation || ""}
              onChange={handleAdditionalInputChange}
              placeholder="Enter the exact location"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        );
    
      case 4:
        return (
          <div className="h-[27rem]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Your image or Image</h2>
            <p className="text-gray-500 mb-6">Please upload your image or image below.</p>
            <div className="flex items-center justify-center w-full">
              {uploadedFile ? (
                <div className="relative">
                  {uploadedFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Uploaded"
                      className="max-w-full h-64 rounded-lg"
                    />
                  ) : (
                    <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg">
                      {uploadedFile.name}
                    </div>
                  )}
                  <button
                    onClick={removeUploadedFile}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16.5 10l-3.8 3.8a4 4 0 0 1-5.7 0L3.2 10m3.8 3.8L3.3 10m3.8 3.8 4.1-3.8m5.1-5v-2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h2.5"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG or DOCX</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept=".pdf, .png, .jpg, .jpeg, .docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        );
    
      default:
        return <p>Invalid Step</p>;
    }
    
  };

  return (
    <>
    <div className="lg:w-2/3 w-full relative bg-white lg:p-8 rounded-r-lg flex flex-col h-full">
    <div className="mb-8">
        <p className="text-sm lg:hidden">
          Already have an account?{' '}
          <Link to="/sellerlogin" className="text-blue-300 underline hover:text-white">
            Login Here
          </Link>
        </p>
      </div>
      <div className="flex-grow">{renderContent()}</div>
      <div className="flex justify-between mt-auto">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-4 rounded-sm"
          >
            Previous
          </button>
        )}
        {currentStep === 4 ? (
          <button
            onClick={handleSubmit}
            className="bg-[#A95FB8] text-white py-2 px-4 rounded-sm"
          >
            {isSellerRequesting ? "Submiting In..." : "Submit"}
          </button>
          
        ) : (
          <button
            onClick={nextStep}
            className="bg-[#A95FB8] text-white py-2 px-4 rounded-sm"
          >
            Next Step
          </button>
        )}
      </div>
    </div>
    {showSuccessModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative p-4 w-full max-w-md h-auto">
      <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          ✕
        </button>

        {/* Success Icon */}
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>

        {/* Dynamic Success Message */}
        <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {`Thank you for submitting the form, ${
            formData.fullName || "User"
          }!`} {/* Example of dynamic message */}
        </p>

        {/* Additional Information */}
        <p className="text-sm text-gray-600 mb-4">
          We have received your application. You will hear from us shortly.
        </p>

        {/* Close Button */}
        <button
          onClick={() => {
            closeModal(); // Close modal logic
            window.location.reload(); // Reload the page after closing the modal
          }}
          className="py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-900"
        >
          Go To dashboard
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default FormContent;
