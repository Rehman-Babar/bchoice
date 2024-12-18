/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";

const EditModal = ({ productData, closeModal }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [hoverImage, setHoverImage] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [unitsInStock, setUnitsInStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(""); // Track input in textarea
  const [videoUrl, setVideoUrls] = useState([]); // Array to hold video URLs
  const [brand, setbrands] = useState(""); // Array to hold video URLs
  const [size, setsizes] = useState(""); // Array to hold video URLs@@@@@@1111@ @@
  const [quality, setqualitys] = useState(""); // Array to hold video URLs
  const [colors, setcolors] = useState(""); // Array to hold video URLs@@
  const [warranty, setwarranty] = useState(""); // Array to hold video URLs@@
  const [type, settypes] = useState("");
  // const dispatch = useDispatch();

  useEffect(() => {
    if (productData) {
      setProductName(productData.productName);
      setDescription(productData.description);
      setShortDescription(productData.shortDescription);
      setCategory(productData.category);
      setDiscount(productData.discount);
      setNewPrice(productData.newPrice);
      setOldPrice(productData.oldPrice);
      setRating(productData.rating);
      setReviews(productData.reviews);
      setProductImage(productData.productImage);
      setHoverImage(productData.hoverImage);
      setProductImages(productData.productImages);
      setUnitsInStock(productData.unitsInStock);
      setCurrentUrl(productData.productVideoUrl);
      setVideoUrls(productData.videoUrl);
      setbrands(productData.brand);
      setsizes(productData.size);
      setqualitys(productData.quality);
      setcolors(productData.colors);
      setwarranty(productData.warranty);
      settypes(productData.type);
    }
  }, [productData]);
  console.log(hoverImage)

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        if (img.width <= 1080 && img.height <= 1080) {
          setImage(reader.result);
        } else {
          toast.error("Image size should not exceed 1080x1080 pixels.");
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const handleProductImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagesCount = files.length;
    const currentImagesCount = productImages.length;

    if (currentImagesCount + newImagesCount > 6) {
      toast.error("You cannot upload more than 6 images.");
      return;
    }

    const imageArray = [];
    let validImagesCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          if (img.width <= 1080 && img.height <= 1080) {
            imageArray.push(reader.result);
            validImagesCount++;
            if (validImagesCount === files.length) {
              setProductImages((prevImages) => [...prevImages, ...imageArray]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const updatedProductData = {
      productName,
      description,
      shortDescription,
      category,
      discount,
      newPrice,
      oldPrice,
      hoverImage,
      productImage,
      productImages,
      rating,
      reviews,
      unitsInStock,
      videoUrl,
      colors,
      warranty,
      brand,
      type,
      size,
      quality,
    };
    console.log(productData._id)
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/client/update/anyproduct/admin/${productData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductData),
        }
      );
  
      const contentType = response.headers.get("content-type");
  
      if (!response.ok) {
        // Check if the response is JSON and parse it accordingly
        let errorData = "An unexpected error occurred";
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          errorData = data.error || errorData;
        }
        throw new Error(errorData);
      }
  
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        toast.success("Product updated successfully");
      } else {
        toast.success("Product updated, but response was not JSON");
      }
  
      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  

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

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen">
      <div className="relative p-4 w-full max-w-4xl max-h-full overflow-y-scroll">
        <div className="relative  rounded-lg shadow bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold  text-white">Edit Product</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              onClick={closeModal}>
              <span className="sr-only">Close modal</span>
              &times;
            </button>
          </div>
          <div className="min-h-screen bg-[#141837] flex justify-center items-center p-4">
      <div className="bg-[#1b2c50] p-6 rounded-lg shadow-lg max-w-5xl  w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Form */}
          <div>
            {/* Product Name Field */}
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
              <label className="block text-white text-sm mb-2">Brand Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={brand}
                onChange={(e) => setbrands(e.target.value)}
                placeholder="Enter Brand name"
              />
            </div>
              
            
             
               
                <div className="mb-4">
              <label className="block text-white text-sm mb-2">Quality</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={quality}
                onChange={(e) => setqualitys(e.target.value)}
                placeholder="Enter quality"
              />
            </div>
              
            
             
               
                <div className="mb-4">
                <label className="block text-white text-sm mb-2">Colors</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                  value={colors}
                  onChange={(e) => setcolors(e.target.value)}
                  placeholder="Enter Who Much Color we have"
                />
              </div>
              
            
             
               
                <div className="mb-4">
                <label className="block text-white text-sm mb-2">Product Warranty</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                  value={warranty}
                  onChange={(e) => setwarranty(e.target.value)}
                  placeholder="Enter product Warranty"
                />
              </div>
              
            
             
               
                <div className="mb-4">
                <label className="block text-white text-sm mb-2">Product Size</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                  value={size}
                  onChange={(e) => setsizes(e.target.value)}
                  placeholder="Enter product size..."
                />
              </div>
             

            {/* Discount Field */}
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

            {/* New Price Field */}
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

            {/* Old Price Field */}
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

            {/* Reviews Field */}
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
            {/* description */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name=""
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                id=""></textarea>
            </div>
            {/* shortDescription */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Short Description or Brand Name</label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                name=""
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                id=""></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">YouTube Video URLs</label>
              <textarea
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                placeholder="Add each URL and press Enter"
              ></textarea>

      <div className="mt-2">
        <p className="text-sm text-white">Added URLs:</p>
        <ul className="text-white list-disc list-inside">
          {videoUrl?.map((url, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{url}</span>
              <button
                onClick={() => removeUrl(url)} // Call removeUrl with the URL to remove
                className="text-red-500 ml-2"
                aria-label={`Remove ${url}`} // Accessibility
              >
                &times; 
              </button>
            </li>
          ))}
        </ul>
      </div>
            </div>

            {/* Category Field */}
            {/* <div className="mb-4">
              <label className="block text-white text-sm mb-2">Category</label>
              <select
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="New Arrival">New Arrival</option>
                <option value="Best Seller">Best Seller</option>
              </select>
            </div> */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Type For Filter</label>
              <select
                className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
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
                <option value="Hand Made">Hand Made</option>
                <option value="Printing">Printing</option>
                <option value="Photo Frames">Photo Frames</option>
                <option value="Resin Art">Resin Art</option>
                <option value="Other">Other</option>
                <option value="Gift Box">Gift Box</option>
                <option value="Eating">Eating</option>
                <option value="Watches">Watches</option>
                <option value="Earburds">Earburds</option>
              </select>
            </div>

            {/* Rating and Units In Stock Fields */}
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

            {/* Submit Button */}
            <button
              className={`w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
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
                  {/* <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                    // onClick={() => removeImage(setProductImage)}
                    >
                    X
                  </button> */}
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
                  {/* <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                    // onClick={() => removeImage(setHoverImage)}
                    >
                    X
                  </button> */}
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
              onChange={handleProductImagesUpload}
              className="mt-4 mb-2 w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
          
        </div>
      </div>
    </div>
    

    </>
  );
};

export default EditModal;
