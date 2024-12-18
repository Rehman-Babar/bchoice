// Parent Component (MultiStepForm)
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FormContent from './FormContent';
import { submitSellerRequest } from 'state/auth/auth';
import { useDispatch } from 'react-redux';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); // Store form data
  const dispatch = useDispatch(); // Redux dispatch

  // Go to the next step if it's not the last one
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to the previous step if it's not the first one
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to handle data sent from child
  const handleFormData = (submissionData) => {
    // setFormData((prevData) => ({ ...prevData, ...data }));
    dispatch(submitSellerRequest(submissionData));
  };

  return (
    <div className="flex items-center justify-center p-2 h-screen bg-blue-100">
      <div className="flex bg-white  items-center p-4 lg:p-0 rounded-sm w-full mx-auto lg:w-2/3 glass z-50">
        <Sidebar currentStep={currentStep} />
        
        <FormContent 
          currentStep={currentStep} 
          nextStep={nextStep} 
          prevStep={prevStep} 
          onFormDataChange={handleFormData} // Passing function to child
        />
      </div>
    </div>
  );
};

export default MultiStepForm;
