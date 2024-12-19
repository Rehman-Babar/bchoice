/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const FeedbackModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [serviceRating, setServiceRating] = useState(3);
  const [review, setReview] = useState("");
  const [experienceRating, setExperienceRating] = useState(5);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Your Feedback</h2>
          <button onClick={onClose} className="text-xl font-bold">
            X
          </button>
        </div>

        <p className="mb-4 text-sm">We value your feedback. Please take a moment to review your experience with us.</p>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Your Name"
          />
        </div>

        {/* Gender Field */}
        <div className="mb-4">
          <label className="block mb-1">Your Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="Male" onChange={() => setGender("Male")} />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="Female" onChange={() => setGender("Female")} />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* Quality of Service */}
        <div className="mb-4">
          <label className="block mb-1">Quality of Service</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setServiceRating(star)}
                className={`cursor-pointer text-3xl ${serviceRating >= star ? "text-yellow-500" : "text-gray-300"}`}>
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Written Review */}
        <div className="mb-4">
          <label className="block mb-1">Leave a written review for others</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Share what you liked or disliked about your experience"
          />
        </div>

        {/* Overall Experience */}
        <div className="mb-6">
          <label className="block mb-1">Overall Experience</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setExperienceRating(num)}
                className={`w-8 h-8 text-sm ${
                  experienceRating === num ? "bg-blue-500 text-white" : "bg-gray-100"
                } rounded-full`}>
                {num}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-black text-white py-2 rounded-md">ADD REVIEW</button>
      </div>
    </div>
  );
};

export default FeedbackModal;
