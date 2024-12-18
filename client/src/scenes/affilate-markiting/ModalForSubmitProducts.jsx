import React, { useState } from "react";
import { useSelector } from "react-redux";

const OrderModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const { user } = useSelector((state) => state.auth);

  const initialFormData = {
    productCategory: "",
    productName: "",
    productQuantity: "",
    productTotalPrice: "",
    instruction: "",
    productImages: [], // Store multiple image URLs here
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreviews, setImagePreviews] = useState([]); // Array for image previews

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      sellerId: user?._id,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Handle multiple files
    const newImagePreviews = [];
    const newImages = [];

    files.forEach((file) => {
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
        newImagePreviews.push(reader.result); // Add preview
        newImages.push(reader.result); // Add to images array
        if (newImagePreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newImagePreviews]);
          setFormData((prev) => ({
            ...prev,
            productImages: [...prev.productImages, ...newImages],
          }));
        }
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    });
  };

  const handleImageRemove = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = { ...formData };
    onSubmit(dataToSubmit); // Submit the form data
    console.log("first", dataToSubmit)
    // Clear form fields after submission
    setFormData(initialFormData);
    setImagePreviews([]); // Clear the image previews
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h2 className="text-lg font-bold mb-4 text-[#ff4560] text-center">Submit New Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            <input
              name="productTotalPrice"
              type="text"
              placeholder="Total Amount"
              value={formData.productTotalPrice}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            />

            <input
              name="productName"
              type="text"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            />
            <input
              name="productQuantity"
              type="text"
              placeholder="Product Quantity"
              value={formData.productQuantity}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            />
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Male</option>
              <option value="Fashion">Female</option>
              <option value="Home">Both</option>
            </select>

            <textarea
              name="instruction"
              placeholder="Instruction"
              value={formData.instruction}
              onChange={handleChange}
              className="border md:p-2 p-1 rounded w-full col-span-1 md:col-span-2"
            ></textarea>

            <div className="col-span-2">
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
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Product Preview ${index + 1}`}
                      className="w-24 h-24 object-cover border rounded"
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
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#ff4560] text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? <span>Loading...</span> : <span>Submit</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
