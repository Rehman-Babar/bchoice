import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addProductLocally } from "state/newArrivalAndBestSeller";
// import { addProduct } from "state/newArrivalAndBestSeller";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  // const [shortDescription, setShortDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [unitsInStock, setUnitsInStock] = useState(0);
  const [category, setCategory] = useState("New Arrival");
  const [reviews, setReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [currentUrl, setCurrentUrl] = useState(""); // Track input in textarea
  const [videoUrl, setVideoUrls] = useState([]); // Array to hold video URLs
  const [brand, setbrands] = useState(""); // Array to hold video URLs
  const [size, setsizes] = useState(""); // Array to hold video URLs@@@@@@1111@ @@
  const [quality, setqualitys] = useState(""); // Array to hold video URLs
  const [colors, setcolors] = useState(""); // Array to hold video URLs@@
  const [warranty, setwarranty] = useState(""); // Array to hold video URLs@@
  const [type, settypes] = useState("Men"); // Array to hold video URLs@@


  const handleKeyDown = (e) => {
    // If Enter is pressed and input is not empty, add URL to array
    if (e.key === "Enter" && currentUrl.trim() !== "") {
      e.preventDefault(); // Prevent newline in textarea
      setVideoUrls([...videoUrl, currentUrl.trim()]); // Add URL to array
      setCurrentUrl(""); // Clear input
    }
  };

  const removeUrl = (urlToRemove) => {
    setVideoUrls(videoUrl.filter(url => url !== urlToRemove)); // Remove URL from array
  };
  // console.log(videoUrl)
  const dispatch = useDispatch();
  // console.log(productImages);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          if (img.width <= 1080 && img.height <= 1080) {
            setImage(reader.result); // Valid image, set it to the state
          } else {
            toast.error("Image dimensions exceed 1080x1080. Please upload a smaller image.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (setImage) => {
    setImage(""); // Remove the image
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files); // Convert to array

    // Check the total number of images after the new upload
    const newImagesCount = files.length;
    const currentImagesCount = productImages.length; // Assuming productImages is your state holding the existing images

    // If total images exceed 6, show an error and return
    if (currentImagesCount + newImagesCount > 6) {
      toast.error("You cannot upload more than 6 images.");
      return;
    }

    const imageArray = [];
    let validImagesCount = 0; // To keep track of valid images

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          // Check image dimensions
          if (img.width <= 1080 && img.height <= 1080) {
            imageArray.push(reader.result); // Store base64 images in array
            validImagesCount++;

            // Check if all files have been read and are valid
            if (validImagesCount === files.length) {
              setProductImages((prevImages) => [...prevImages, ...imageArray]); // Append new images to the existing array
            }
          } else {
            toast.error("Image size should not exceed 1080x1080 pixels.");
          }
        };
      };

      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    const filteredImages = productImages.filter((_, index) => index !== indexToRemove);
    setProductImages(filteredImages);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    // Rating validation check
    if (rating > 5) {
      toast.error("Rating cannot be more than 5");
      return; // Prevent form submission if rating is greater than 5
    }

    const productData = {
      productName,
      description,
      shortDescription,
      discount: parseFloat(discount),
      newPrice: parseFloat(newPrice),
      oldPrice: parseFloat(oldPrice),
      productImages,
      productImage,
      hoverImage,
      unitsInStock: parseInt(unitsInStock, 10),
      category,
      reviews: parseInt(reviews, 10),
      rating: parseFloat(rating),
      videoUrl,
      brand,
      quality,
      type,
      size,
      warranty,
      colors
    };

    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/client/addproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        toast.error(data.error || "Error submitting product");
        return;
      }

      // If submission is successful, dispatch the local action to add it to the slice
      dispatch(addProductLocally(productData));

      toast.success("Product added successfully");

      resetForm(); // Reset form fields and images
    } catch (error) {
      console.log("Error submitting product:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductName("");
    setDescription("");
    setShortDescription("");
    setDiscount(0);
    setNewPrice(0);
    setOldPrice(0);
    setProductImages([]);
    setProductImage("");
    setHoverImage("");
    setUnitsInStock(0);
    setCategory("New Arrival");
    setReviews(0);
    setRating(0);
    setVideoUrls([])
    setbrands("");
    settypes("");
    setsizes("");
    setwarranty("");
    setcolors("");
    setqualitys("");

  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex justify-center items-center p-4">
      <div className="bg-[#F0F0F0] p-6 rounded-lg shadow-lg max-w-5xl  w-full">
        <h1 className="text-[#665429] text-2xl font-semibold mb-4">Add Product</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Form */}
          <div>
            {/* Product Name Field */}
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Product Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Brand Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={brand}
                onChange={(e) => setbrands(e.target.value)}
                placeholder="Enter Brand name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Quality</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={quality}
                onChange={(e) => setqualitys(e.target.value)}
                placeholder="Enter quality"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Colors</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={colors}
                onChange={(e) => setcolors(e.target.value)}
                placeholder="Enter Who Much Color we have"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Product Warranty</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={warranty}
                onChange={(e) => setwarranty(e.target.value)}
                placeholder="Enter product Warranty"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Product Size</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={size}
                onChange={(e) => setsizes(e.target.value)}
                placeholder="Enter product size..."
              />
            </div>

            {/* Discount Field */}
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Discount (%)</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="45"
              />
            </div>

            {/* New Price Field */}
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">New Price</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="4500"
              />
            </div>

            {/* Old Price Field */}
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Old Price</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="5000"
              />
            </div>

            {/* Reviews Field */}
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Reviews</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                placeholder="41"
              />
            </div>
            {/* description */}
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name=""
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                id=""></textarea>
            </div>
            {/* shortDescription */}
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Short Description or Brand Name</label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                name=""
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                id=""></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">YouTube Video URLs</label>
              <textarea
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                placeholder="Add each URL and press Enter"
              ></textarea>

      <div className="mt-2">
        <p className="text-sm text-[#736543 ]">Added URLs:</p>
        <ul className="text-[#665429] list-disc list-inside">
          {videoUrl.map((url, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{url}</span>
              <button
                onClick={() => removeUrl(url)} // Call removeUrl with the URL to remove
                className="text-red-500 ml-2"
                aria-label={`Remove ${url}`} // Accessibility
              >
                &times; {/* Cross symbol */}
              </button>
            </li>
          ))}
        </ul>
      </div>
            </div>

            {/* Category Field */}
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Category</label>
              <select
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="New Arrival">New Arrival</option>
                <option value="Best Seller">Best Seller</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[#736543] text-sm mb-2">Type For Filter</label>
              <select
                className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                value={type}
                onChange={(e) => settypes(e.target.value)}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Tech">Tech</option>
                <option value="Toy And Games">Toy And Games</option>
                <option value="Beauty And Persnol Care">Beauty And Persnol Care</option>
                <option value="Clothing">Clothing</option>
                {/* <option value="Gifts">Gifts</option> */}
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            {/* Rating and Units In Stock Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-[#736543] text-sm mb-2">Rating</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter rating"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#736543] text-sm mb-2">Units In Stock</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-[#EEE7E0] text-[#665429] border border-gray-400"
                  value={unitsInStock}
                  onChange={(e) => setUnitsInStock(e.target.value)}
                  placeholder="Enter units in stock"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className={`w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmitProduct}
              disabled={loading}>
              {loading ? "Adding..." : "Add Product Now"}
            </button>
          </div>

          {/* Right Side: Upload Section */}
          <div className="flex flex-col justify-center items-center">
            {/* Product Image Upload with Remove Button */}
            <div className="relative bg-gray-400 w-full h-40 rounded-lg flex justify-center items-center">
              {productImage ? (
                <>
                  <img src={productImage} alt="Product" className="w-full h-full object-scale-down rounded-lg" />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                    onClick={() => handleRemoveImage(setProductImage)}>
                    X
                  </button>
                </>
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

            {/* Hover Image Upload with Remove Button */}
            <div className="relative bg-gray-400 w-full h-40 rounded-lg flex justify-center items-center mt-4">
              {hoverImage ? (
                <>
                  <img src={hoverImage} alt="Hover" className="w-full h-full object-scale-down rounded-lg" />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                    onClick={() => handleRemoveImage(setHoverImage)}>
                    X
                  </button>
                </>
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
            <div className="bg-gray-400 w-full h-40 rounded-lg flex items-center justify-center overflow-hidden">
              {productImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 w-full h-full overflow-auto">
                  {productImages.map((image, index) => (
                    <div key={index} className="relative h-full">
                      <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover rounded-lg" />
                      {/* Remove Button */}
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                        onClick={() => removeImage(index)}>
                        X
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-700 text-4xl text-center">📤 </span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple // Allow multiple images
              onChange={handleImagesUpload}
              className="mt-4 mb-2 w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
