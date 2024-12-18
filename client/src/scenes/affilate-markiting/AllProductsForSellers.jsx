import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import OrderUpdateModal from "./ModalForUpdateProducts";
import OrderModal from "./ModalForSubmitProducts";
import { formatMemberSinceDate } from "utils/date";

const AllProductsForSellers = () => {
  const [products, setProducts] = useState([]); // State for products
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for viewing
  const [currentProductUpdate, setCurrentProductUpdate] = useState(null); // Selected product for editing
  const [loading, setLoading] = useState(false); //

  // images
  const [showImageModal, setShowImageModal] = useState(false); // State to control the image modal visibility
  // const [showImageModal, setShowImageModal] = useState(false); // State to control the image modal visibility
  const [currentImage, setCurrentImage] = useState(null); // State to hold the current image for modal

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v3/products/products/all"); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  // Close modals
  const handleCloseModal = () => setModalOpen(false);
  const closeUpdateModal = () => setUpdateModalOpen(false);

  // Open modals
  const handleOpenModal = () => setModalOpen(true);

  const handleEditProduct = (product) => {
    setCurrentProductUpdate(product);
    setUpdateModalOpen(true);
  };

  // Handle updating a product
  const handleUpdateProduct = async (formData) => {
    if (!currentProductUpdate) {
      toast.error("No product selected for update.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/v3/products/products/update/${currentProductUpdate._id}`,
        formData
      );
      toast.success("Product updated successfully!");
      setProducts((prev) =>
        prev.map((product) =>
          product._id === currentProductUpdate._id ? response.data : product
        )
      );
      closeUpdateModal();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  // Handle product submission
  const handleSubmitProduct = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/v3/products/products/add",
        formData
      );
      toast.success("Product submitted successfully!");
      setProducts((prev) => [ response.data, ...prev]);
      handleCloseModal();
      
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to submit product.");
    } finally{
      setLoading(false);
    }
  };


  const submitDelete =async (product) => {
    setLoading(true);
    try {
      await axios.delete(`/api/v3/products/delete/${product._id}`);
      toast.success("Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p._id!== product._id));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    } finally {
      setLoading(false);
    }

  }


  return (
    <div className="lg:p-4 p-2  overflow-auto">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {products.length > 0 ? (
       <table className="table-auto w-full border-collapse border border-gray-300 text-[7px] lg:text-sm">
       <thead>
         <tr className="bg-gray-100">
           <th className="border border-gray-300 lg:p-2 p-[2px]">Sr#</th>
           <th className="border border-gray-300 lg:p-2 p-[2px]">Product Images</th>
           <th className="border border-gray-300 lg:p-2 p-[2px]">Product Name</th>
           <th className="border border-gray-300 lg:p-2 p-[2px]">Price</th>
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
               <div className="flex flex-wrap gap-1">
                 {product.productImages?.map((imageUrl, idx) => (
                   <img
                     key={idx}
                     src={imageUrl}
                     alt={"affiliate product"}
                     className="w-10 h-10 rounded-sm border"
                   />
                 ))}
               </div>
             </td>
             <td className="border border-gray-300 lg:p-2 p-[2px]">
               {product.productName.split(" ").slice(0, 3).join(" ")}
             </td>
             <td className="border border-gray-300 lg:p-2 p-[2px]">{product.productTotalPrice}</td>
             <td className="border border-gray-300 lg:p-2 p-[2px] hidden lg:table-cell">{product.productCategory}</td>
             <td className="border border-gray-300 lg:p-2 p-[2px] hidden lg:table-cell">{product.productQuantity}</td>
             <td className="border-b border-gray-300 lg:p-2 p-[2px] flex items-center justify-between h-[50px] sm:h-[58px]">
               <FaEye
                 className="text-gray-800 hover:text-green-500 cursor-pointer mx-2"
                 onClick={() => setSelectedProduct(product)}
               />
               <FaEdit
                 className="text-gray-800 hover:text-blue-500 cursor-pointer mx-2"
                 onClick={() => handleEditProduct(product)}
               />
               <FaTrash
                 onClick={() => submitDelete(product)}
                 className="text-gray-800 hover:text-red-500 cursor-pointer mx-2"
               />
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     
      
      ) : (
        <p>No products found.</p>
      )}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-4 right-4 bg-[#ff4560] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:[#A99FB1]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
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
                  <td className="border border-gray-300 lg:p-2 p-1">
                    {products.findIndex((p) => p._id === selectedProduct._id) + 1}
                  </td>
                </tr>
                <tr>
  <td className="border border-gray-300 lg:p-2 p-1">Product Images</td>
  <td className="border border-gray-300 lg:p-2 p-1">
    <div className="flex flex-wrap gap-1">
      {selectedProduct.productImages?.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`${selectedProduct.productName} - Image ${index + 1}`}
          className="w-16 h-16 rounded-sm cursor-pointer border"
          onClick={() => {
            setShowImageModal(true); // Show the image modal
            setCurrentImage(imageUrl); // Set the clicked image to display in the modal
          }}
        />
      ))}
    </div>
  </td>
</tr>

                <tr>
                  <td className="border border-gray-300 lg:p-2 p-1">Product Name</td>
                  <td className="border border-gray-300 lg:p-2 p-1">{selectedProduct.productName}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 lg:p-2 p-1">Price</td>
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-lg">
            <img src={currentImage} alt="Product" className="w-full h-auto" />
            <button
              onClick={() => setShowImageModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}



      <OrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        loading={loading}
      />
      <OrderUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onSubmit={handleUpdateProduct}
        product={currentProductUpdate}
      />
    </div>
  );
};

export default AllProductsForSellers;
