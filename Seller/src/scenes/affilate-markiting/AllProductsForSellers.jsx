import React, { useState, useEffect } from "react";
import {  FaEye } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

import { formatMemberSinceDate } from "utils/date";

const AllProductsForSellers = () => {
  const [products, setProducts] = useState([]); // State for products


  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for viewing

  // images
  const [showImageModal, setShowImageModal] = useState(false); // State to control the image modal visibility

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/products/products/all`); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);






  return (
    <div className="lg:p-4 p-2  overflow-auto">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {products.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 text-[7px] lg:text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 lg:p-2 p-[2px]">Sr#</th>
            <th className="border border-gray-300 lg:p-2 p-[2px]">Product Image</th>
            <th className="border border-gray-300 lg:p-2 p-[2px]">Product Name</th>
            <th className="border border-gray-300 lg:p-2 p-[2px]">Added Date</th>
            <th className="border border-gray-300 lg:p-2 p-[2px]">Total Price</th>
            <th className="border border-gray-300 lg:p-2 p-[2px] hidden lg:table-cell">Category</th>
            <th className="border border-gray-300 lg:p-2 p-[2px] hidden lg:table-cell">Quantity</th>
            <th className="border border-gray-300 lg:p-2 p-[2px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 lg:p-2 p-[2px]">{index + 1}</td>
              <td className="border border-gray-300 lg:p-2 p-[2px]">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="border border-gray-300 lg:p-2 p-[2px]">{product.productName}</td>
              <td className="border border-gray-300 lg:p-2 p-[2px]">{formatMemberSinceDate(product.createdAt)}</td>
              <td className="border border-gray-300 lg:p-2 p-[2px]">{product.productTotalPrice}</td>
              <td className="border border-gray-300 lg:p-2 p-[2px] hidden lg:table-cell">{product.productCategory}</td>
              <td className="border border-gray-300 lg:p-2 p-[2px] hidden lg:table-cell">{product.productQuantity}</td>
              <td className="border-b border-gray-300 lg:p-2 p-[2px] flex items-center justify-between h-[50px] sm:h-[58px]">
                <FaEye
                  className="text-gray-800 hover:text-green-500 cursor-pointer mx-2"
                  onClick={() => setSelectedProduct(product)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      ) : (
        <p>No products found.</p>
      )}

      {/* View Modal */}
      {selectedProduct && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 text-[8px] lg:text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 lg:p-2 p-1">Field</th>
            <th className="border border-gray-300 lg:p-2 p-1">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 lg:p-2 p-1">Sr#</td>
            <td className="border border-gray-300 lg:p-2 p-1">{products.findIndex(p => p._id === selectedProduct._id) + 1}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 lg:p-2 p-1">Product Image</td>
            <td className="border border-gray-300 lg:p-2 p-1">
              <img
                src={selectedProduct.productImage}
                alt={selectedProduct.productName}
                className="w-16 h-16 rounded cursor-pointer"
                onClick={() => setShowImageModal(true)} // Open modal on image click
              />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 lg:p-2 p-1">Product Name</td>
            <td className="border border-gray-300 lg:p-2 p-1">{selectedProduct.productName}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 lg:p-2 p-1">Added Date</td>
            <td className="border border-gray-300 lg:p-2 p-1">{formatMemberSinceDate(selectedProduct.createdAt)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 lg:p-2 p-1">Total Price</td>
            <td className="border border-gray-300 lg:p-2 p-1">{selectedProduct.productTotalPrice}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 lg:p-2 p-1">Category</td>
            <td className="border border-gray-300 lg:p-2 p-1">{selectedProduct.productCategory}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 lg:p-2 p-1">Quantity</td>
            <td className="border border-gray-300 lg:p-2 p-1">{selectedProduct.productQuantity}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 lg:p-2 p-1">Instruction</td>
            <td className="border border-gray-300 lg:p-2 p-1 overflow-y-scroll">{selectedProduct.instruction}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => setSelectedProduct(null)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{showImageModal && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Product Image</h2>
      <div className="flex justify-center">
        <img
          src={selectedProduct.productImage}
          alt={selectedProduct.productName}
          className="max-w-full max-h-[80vh] object-contain"
        />
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => setShowImageModal(false)} // Close the modal
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    
    </div>
  );
};

export default AllProductsForSellers;
