// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const AddProductsToBestSelling = () => {
//   const [productName, setProductName] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [newPrice, setNewPrice] = useState(0);
//   const [oldPrice, setOldPrice] = useState(0);
//   const [productImages, setProductImages] = useState([]); // Array for multiple images
//   const [productImage, setProductImage] = useState(null); // Single product image
//   const [hoverImage, setHoverImage] = useState(null); // Single hover image
//   const [unitsInStock, setUnitsInStock] = useState(0);
//   const [category, setCategory] = useState("Best Seller");
//   const [reviews, setReviews] = useState(0);
//   const [description, setDescription] = useState("");
//   const [rating, setRating] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [shortDescription, setshortDescription] = useState("");
//   // const [currentUrl, setCurrentUrl] = useState(""); // Track input in textarea
//   // const [videoUrl, setVideoUrls] = useState([]); // Array to hold video URLs

//   // const handleKeyDown = (e) => {
//   //   // If Enter is pressed and input is not empty, add URL to array
//   //   if (e.key === "Enter" && currentUrl.trim() !== "") {
//   //     e.preventDefault(); // Prevent newline in textarea
//   //     setVideoUrls([...videoUrl, currentUrl.trim()]); // Add URL to array
//   //     setCurrentUrl(""); // Clear input
//   //   }
//   // };

//   // const removeUrl = (urlToRemove) => {
//   //   setVideoUrls(videoUrl.filter(url => url !== urlToRemove)); // Remove URL from array
//   // };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files); // Convert to array

//     // Check the total number of images after the new upload
//     const newImagesCount = files.length;
//     const currentImagesCount = productImages.length; // Assuming productImages is your state holding the existing images

//     // If total images exceed 6, show an error and return
//     if (currentImagesCount + newImagesCount > 6) {
//       toast.error("You cannot upload more than 6 images.");
//       return;
//     }

//     const imageArray = [];
//     let validImagesCount = 0; // To keep track of valid images

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const img = new Image();
//         img.src = reader.result;

//         img.onload = () => {
//           // Check image dimensions
//           if (img.width <= 1080 && img.height <= 1080) {
//             imageArray.push(reader.result); // Store base64 images in array
//             validImagesCount++;

//             // Check if all files have been read and are valid
//             if (validImagesCount === files.length) {
//               setProductImages((prevImages) => [...prevImages, ...imageArray]); // Append new images to the existing array
//             }
//           } else {
//             toast.error("Image size should not exceed 1080x1080 pixels.");
//           }
//         };
//       };

//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (indexToRemove) => {
//     const filteredImages = productImages.filter((_, index) => index !== indexToRemove);
//     setProductImages(filteredImages);
//   };

//   const handleProductImageUpload = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const img = new Image();
//         img.src = reader.result;

//         img.onload = () => {
//           // Check image dimensions
//           if (img.width <= 1080 && img.height <= 1080) {
//             setProductImage(reader.result); // Set product image if dimensions are valid
//           } else {
//             toast.error("Image size should not exceed 1080x1080 pixels");
//           }
//         };
//       };

//       reader.readAsDataURL(file); // Start reading the image file
//     }
//   };

//   const removeProductImage = () => {
//     setProductImage(null); // Clear product image
//   };

//   const handleHoverImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const img = new Image();
//         img.src = reader.result;
//         img.onload = () => {
//           // Check image dimensions
//           if (img.width <= 1080 && img.height <= 1080) {
//             setHoverImage(reader.result); // Set hover image if dimensions are valid
//           } else {
//             toast.error("Image size should not exceed 1080x1080 pixels");
//           }
//         };
//         // Set hover image
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeHoverImage = () => {
//     setHoverImage(null); // Clear hover image
//   };

//   const handleSubmitProduct = async (e) => {
//     e.preventDefault();

//     if (rating > 5) {
//       toast.error("Rating cannot be more than 5");
//       return; // Prevent form submission if rating is greater than 5
//     }

//     const productData = {
//       productName,
//       discount: parseFloat(discount),
//       newPrice: parseFloat(newPrice),
//       oldPrice: parseFloat(oldPrice),
//       productImages, // Array of images
//       productImage, // Single product image
//       hoverImage, // Single hover image
//       unitsInStock: parseInt(unitsInStock, 10),
//       category,
//       reviews: parseInt(reviews, 10),
//       rating: parseFloat(rating),
//       description, // Added description to payload
//       shortDescription, // Added short description to payload
//       // videoUrl, // Added video URL to payload
//     };

//     try {
//       setLoading(true);
//       const response = await fetch(`/client/bestsellingorder`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productData),
//       });

//       const data = await response.json();

//       if (data.error) {
//         toast.error("Error submitting product: " + data.error);
//         return;
//       }
//       toast.success("Product added successfully");

//       // Reset form fields and images
//       resetForm();
//     } catch (error) {
//       console.log("Error submitting product:", error);
//       toast.error("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setProductName("");
//     setDiscount(0);
//     setNewPrice(0);
//     setOldPrice(0);
//     setProductImages([]);
//     setProductImage(null);
//     setHoverImage(null);
//     setUnitsInStock(0);
//     setCategory("Best Seller");
//     setReviews(0);
//     setDescription("");
//     setRating(0);
//     // setVideoUrls([]);
//   };

//   return (
//     <div className="min-h-screen bg-[#141837] flex justify-center items-center p-4">
//       <div className="bg-[#1b2c50] p-6 rounded-lg shadow-lg max-w-5xl w-full">
//         <h1 className="text-white text-2xl font-semibold mb-4">Best Selling Product</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Side Form */}
//           <div>
//             {/* Product Name Field */}
//             <div className="mb-4">
//               <label className="block text-white text-sm mb-2">Product Name</label>
//               <input
//                 type="text"
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 placeholder="Enter product name"
//               />
//             </div>

//             {/* Discount Field */}
//             <div className="mb-4">
//               <label className="block text-white text-sm mb-2">Discount (%)</label>
//               <input
//                 type="number"
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 value={discount}
//                 onChange={(e) => setDiscount(e.target.value)}
//                 placeholder="45"
//               />
//             </div>

//             {/* New Price Field */}
//             <div className="mb-4">
//               <label className="block text-white text-sm mb-2">New Price</label>
//               <input
//                 type="number"
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 value={newPrice}
//                 onChange={(e) => setNewPrice(e.target.value)}
//                 placeholder="4500"
//               />
//             </div>

//             {/* Old Price Field */}
//             <div className="mb-4">
//               <label className="block text-white text-sm mb-2">Old Price</label>
//               <input
//                 type="number"
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 value={oldPrice}
//                 onChange={(e) => setOldPrice(e.target.value)}
//                 placeholder="5000"
//               />
//             </div>

//             {/* Reviews Field */}
//             <div className="mb-4">
//               <label className="block text-white text-sm mb-2">Reviews</label>
//               <input
//                 type="number"
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 value={reviews}
//                 onChange={(e) => setReviews(e.target.value)}
//                 placeholder="41"
//               />
//             </div>

//             {/* Description Field */}
//             <div className="mb-4">
//               <label className="block text-white text-sm mb-2">Description</label>
//               <textarea
//                 rows="4"
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter product description"></textarea>
//             </div>
//             {/* Short Description Field */}
//             <div className="mb-4">
//               <label className="block text-white text-sm mb-2">Short Description or Brand Name</label>
//               <textarea
//                 rows="4"
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 value={shortDescription}
//                 onChange={(e) => setshortDescription(e.target.value)}
//                 placeholder="Enter product description"></textarea>
//             </div>
//             {/* <div className="mb-4">
//               <label className="block text-white text-sm mb-2">YouTube Video URLs</label>
//               <textarea
//                 value={currentUrl}
//                 onChange={(e) => setCurrentUrl(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 placeholder="Add each URL and press Enter"
//               ></textarea>

//       <div className="mt-2">
//         <p className="text-sm text-white">Added URLs:</p>
//         <ul className="text-white list-disc list-inside">
//           {videoUrl.map((url, index) => (
//             <li key={index} className="flex justify-between items-center">
//               <span>{url}</span>
//               <button
//                 onClick={() => removeUrl(url)} // Call removeUrl with the URL to remove
//                 className="text-red-500 ml-2"
//                 aria-label={`Remove ${url}`} // Accessibility
//               >
//                 &times; {/* Cross symbol */}
//               {/* </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//             // </div> */} 

//             {/* Category Field */}
//             <div className="mb-4">
//               <label className="block text-white text-sm mb-2">Category</label>
//               <select
//                 className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}>
//                 {/* <option value="New Arrival">New Arrival</option> */}
//                 <option value="Best Seller">Best Seller</option>
//                 {/* <option value="Featured">Featured</option> */}
//               </select>
//             </div>

//             {/* Rating and Units In Stock Fields */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="mb-4">
//                 <label className="block text-white text-sm mb-2">Rating</label>
//                 <input
//                   type="number"
//                   className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                   value={rating}
//                   onChange={(e) => setRating(e.target.value)}
//                   placeholder="Enter rating"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-white text-sm mb-2">Units In Stock</label>
//                 <input
//                   type="number"
//                   className="w-full p-2 rounded bg-[#4D637D] text-white border border-gray-400"
//                   value={unitsInStock}
//                   onChange={(e) => setUnitsInStock(e.target.value)}
//                   placeholder="Enter units in stock"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-center">
//               <button
//                 className={`bg-[#2C3E50] text-[#FFE3A3] p-3 rounded-lg font-semibold ${
//                   loading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 onClick={handleSubmitProduct}
//                 disabled={loading}>
//                 {loading ? "Adding..." : "Add Product Now"}
//               </button>
//             </div>
//           </div>

//           {/* Right Side: Upload Section */}
//           <div className="flex flex-col justify-center items-center">
//             {/* Product Image Section */}
//             <div className="bg-gray-400 w-full h-40 rounded-lg flex items-center overflow-hidden mb-4 relative">
//               {productImage ? (
//                 <img src={productImage} alt="Product" className="w-full h-full object-scale-down rounded-lg" />
//               ) : (
//                 <span className="text-gray-700 text-4xl">📤 Product Image</span>
//               )}
//               {productImage && (
//                 <button
//                   className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
//                   onClick={removeProductImage}>
//                   X
//                 </button>
//               )}
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleProductImageUpload}
//               className="mb-4 w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold"
//             />

//             {/* Hover Image Section */}
//             <div className="bg-gray-400 w-full h-40 rounded-lg flex items-center overflow-hidden mb-4 relative">
//               {hoverImage ? (
//                 <img src={hoverImage} alt="Hover Image" className="w-full h-full object-scale-down rounded-lg" />
//               ) : (
//                 <span className="text-gray-700 text-4xl">📤 Hover Image</span>
//               )}
//               {hoverImage && (
//                 <button
//                   className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
//                   onClick={removeHoverImage}>
//                   X
//                 </button>
//               )}
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleHoverImageUpload}
//               className="mb-4 w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold"
//             />

//             {/* Product Images Section */}
//             <div className="bg-gray-400 w-full h-40 rounded-lg flex items-center overflow-hidden">
//               {productImages.length > 0 ? (
//                 <div className="grid grid-cols-2 gap-2 w-full h-full overflow-auto">
//                   {productImages.map((image, index) => (
//                     <div key={index} className="relative h-full">
//                       <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover rounded-lg" />
//                       {/* Remove Button */}
//                       <button
//                         className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
//                         onClick={() => removeImage(index)}>
//                         X
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <span className="text-gray-700 text-4xl">📤 Product Images</span>
//               )}
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               multiple // Allow multiple images
//               onChange={handleImageUpload}
//               className="mt-4 mb-2 w-full bg-[#FFE3A3] text-[#2C3E50] p-3 rounded-lg font-semibold"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductsToBestSelling;
