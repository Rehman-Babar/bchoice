import React, { useState } from "react";
import toast from "react-hot-toast";
const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [unitsInStock, setUnitsInStock] = useState(0);
  const [category, setCategory] = useState("New Arrival");
  const [reviews, setReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setloading] = useState(false);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      discount: parseFloat(discount),
      newPrice: parseFloat(newPrice),
      oldPrice: parseFloat(oldPrice),
      productImage,
      hoverImage,
      unitsInStock: parseInt(unitsInStock, 10),
      category,
      reviews: parseInt(reviews, 10),
      rating: parseFloat(rating),
    };

    try {
      setloading(true);
      // Make the POST request using fetch
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/client/addproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.error) {
        console.log("errior", data.error);
        toast.error("Error submitting product");
        return;
      }
      console.log("Product added successfully:");
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error submitting product:", error);
      return;
      // Handle network or other errors
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141837] flex justify-center items-center p-4">
      <div className="bg-[#1b2c50] p-6 rounded-lg shadow-lg max-w-5xl w-full">
        <h1 className="text-white text-2xl font-semibold mb-4">Add Product</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Form */}
          <div>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Product Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Discount (%)</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="45"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm mb-2">New Price</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="4500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Old Price</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="5000"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Reviews</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                placeholder="41"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Category</label>
              <select
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="New Arrival">New Arrival</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Featured">Featured</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-white text-sm mb-2">Rating</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter rating"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm mb-2">Units In Stock</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                  value={unitsInStock}
                  onChange={(e) => setUnitsInStock(e.target.value)}
                  placeholder="Enter units in stock"
                />
              </div>
            </div>

            <button
              className="w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold"
              onClick={handleSubmitProduct}>
              {loading ? "Adding..." : "Add Product Now"}
            </button>
          </div>

          {/* Right Side: Upload Section */}
          <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-400 w-full h-40 rounded-lg flex justify-center items-center">
              {productImage ? (
                <img src={productImage} alt="Product" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-gray-700 text-4xl">📤</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setProductImage)}
              className="mt-4 mb-2 w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold"
            />

            <div className="bg-gray-400 w-full h-40 rounded-lg flex justify-center items-center">
              {hoverImage ? (
                <img src={hoverImage} alt="Hover" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-gray-700 text-4xl">📤</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setHoverImage)}
              className="mt-4 w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
