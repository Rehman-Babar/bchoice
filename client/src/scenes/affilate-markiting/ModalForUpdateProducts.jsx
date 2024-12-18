import React, { useState, useEffect } from "react";

const OrderUpdateModal = ({ isOpen, onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState({
    productImages: [], // Initialize as an empty array
  });
  const [imagePreviews, setImagePreviews] = useState([]); // For image preview array

  useEffect(() => {
    if (isOpen && product) {
      // Initialize form data with the required fields from the product
      setFormData({
        instruction: product.instruction || "",
        productName: product.productName || "",
        productQuantity: product.productQuantity || "",
        productTotalPrice: product.productTotalPrice || "",
        productCategory: product.productCategory || "",
        productImages: product.productImages || [], // Array of images
      });
      setImagePreviews(product.productImages || []); // Set preview if images are available
    }
  }, [isOpen, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [...imagePreviews]; // Create a new array for previews

    // Loop through selected files and handle them
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be under 2MB.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Invalid file type. Please select an image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result); // Add preview to the array
        setImagePreviews(newImages); // Update previews array
        setFormData({ ...formData, productImages: newImages }); // Update formData with new images
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const handleImageRemove = (index) => {
    const newImages = [...imagePreviews];
    newImages.splice(index, 1); // Remove the image at the specified index
    setImagePreviews(newImages);
    setFormData({ ...formData, productImages: newImages }); // Update formData with new images array
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass updated data to the parent
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-3 sm:p-6 rounded-sm shadow-lg w-full sm:w-3/4 lg:w-1/2">
        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-[#ff4560]">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-[9px] sm:text-sm font-medium mb-1" htmlFor="productName">
                Product Name
              </label>
              <input
                id="productName"
                name="productName"
                type="text"
                value={formData.productName}
                onChange={handleChange}
                className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[9px] sm:text-sm font-medium mb-1" htmlFor="productQuantity">
                Product Quantity
              </label>
              <input
                id="productQuantity"
                name="productQuantity"
                type="text"
                value={formData.productQuantity}
                onChange={handleChange}
                className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[9px] sm:text-sm font-medium mb-1" htmlFor="productTotalPrice">
                Total Price
              </label>
              <input
                id="productTotalPrice"
                name="productTotalPrice"
                type="text"
                value={formData.productTotalPrice}
                onChange={handleChange}
                className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[9px] sm:text-sm font-medium mb-1" htmlFor="productCategory">
                Category
              </label>
              <input
                id="productCategory"
                name="productCategory"
                type="text"
                value={formData.productCategory}
                onChange={handleChange}
                className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-sm"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[9px] sm:text-sm font-medium mb-1" htmlFor="productImages">
                Product Images
              </label>
              {imagePreviews.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {imagePreviews.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product Preview ${index + 1}`}
                        className="w-32 h-32 object-cover border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="productImages"
                    className="bg-[#ff4560] text-white px-4 py-2 rounded cursor-pointer"
                  >
                    Select Product Images
                  </label>
                  <input
                    id="productImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[9px] sm:text-sm font-medium mb-1" htmlFor="instruction">
                Instruction
              </label>
              <textarea
                id="instruction"
                name="instruction"
                value={formData.instruction}
                onChange={handleChange}
                className="border p-1 sm:p-2 rounded w-full text-[9px] sm:text-sm"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-1 sm:px-4 sm:py-2 rounded mr-2 text-[9px] sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#ff4560] text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-[9px] sm:text-sm"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderUpdateModal;
