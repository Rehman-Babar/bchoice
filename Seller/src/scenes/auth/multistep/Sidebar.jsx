import React from 'react';
import sidebarBg from './bg-sidebar3.jpeg';
import { Link } from 'react-router-dom';

const Sidebar = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'YOUR INFO' },
    { number: 2, label: 'Profession' },
    { number: 3, label: 'Details' },
    { number: 4, label: 'Personal Information' },
  ];

  return (
    <div className="relative w-1/3 hidden md:flex text-white h-[35.5rem] -ml-1">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${sidebarBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0, // Image is at a lower layer
        }}
      />

      {/* Glass Effect Overlay */}
      <div
        className="relative w-full p-8 rounded-l-sm flex flex-col justify-between glass"
        style={{
          boxShadow: '0 4px 30px rgba(57, 57, 57, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(21, 4, 58, 0.032)',
          zIndex: 10, // Glass effect is above the background image
        }}
      >
        {/* Login Section */}
        <div className="mb-8">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/sellerlogin" className="text-blue-300 underline hover:text-white">
              Login Here
            </Link>
          </p>
        </div>

        {/* Steps List */}
        <ul className="space-y-8">
          {steps.map((step) => (
            <li key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === step.number ? 'bg-purple-200 text-purple-800' : 'bg-[#A95FB8]'
                } text-center mr-4`}
              >
                {step.number}
              </div>
              <div>
                <div className="text-sm uppercase">{step.label}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* Bottom Placeholder (Optional) */}
        <div className="mt-auto">
          {/* Add any footer-related content here if necessary */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
