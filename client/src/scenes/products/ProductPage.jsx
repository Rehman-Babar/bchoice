import React from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121634] flex justify-center items-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#21295C] p-4 shadow-md rounded-lg max-w-5xl w-full">
        {/* Product Table Section */}
        <div className="bg-[#4D547D] p-6 rounded-md w-full">
          <h2 className="text-white text-xl mb-4">Product Name</h2>
          <div className="space-y-4">
            {/* Product Rows */}
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="grid grid-cols-6 items-center bg-gray-700 text-white p-3 rounded-lg shadow">
                  <div className="flex items-center space-x-2 col-span-2">
                    <span className="w-4 h-4 rounded-full bg-gray-400"></span>
                    <span>Lorem Ipsum Product {idx + 1}</span>
                  </div>
                  <span>1,000</span>
                  <span>500</span>
                  <span>28 March 2019</span>
                  <button className="bg-gray-500 p-2 rounded-full text-white">🗑️</button>
                </div>
              ))}
          </div>
          {/* Add/Delete Buttons */}
          <div className="mt-6 space-y-2">
            <button
              className="w-full bg-[#FFE3A3] text-gray-800 p-2 rounded-lg"
              onClick={() => navigate("/addproducts")}>
              Add New Product
            </button>
            <button className="w-full bg-[#FFE3A3] text-gray-800 p-2 rounded-lg">Delete Selected Products</button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-gray-600 p-6 rounded-md w-full">
          <h2 className="text-white text-xl mb-4">Product Categories</h2>
          <div className="space-y-2 overflow-y-auto h-64">
            {Array(11)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-700 p-3 rounded-lg shadow text-white">
                  <span>Product Category {idx + 1}</span>
                  <button className="bg-gray-500 p-2 rounded-full text-white">🗑️</button>
                </div>
              ))}
          </div>
          {/* Add Category Button */}
          <div className="mt-4">
            <button className="w-full bg-[#FFE3A3] text-gray-800 p-2 rounded-lg">Add New Category</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
