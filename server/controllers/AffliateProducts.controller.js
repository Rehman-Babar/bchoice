import { v2 as cloudinary } from "cloudinary";
import { AffilateMarketingProducts } from "../models/AffilateProducts.js";
 // products
  export const getAllProducts = async (req, res) => {
    try {
      // Fetch all orders from the database
      const products = await AffilateMarketingProducts.find().sort({ createdAt: -1 })
  
      // Respond with the retrieved orders
      res.status(200).json(products);
    } catch (error) {
      // Handle any errors
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const addProduct = async (req, res) => {
    const { productName, productTotalPrice, productQuantity, productCategory, instruction, productImages } = req.body;
  
    try {
      if (!productName || !productTotalPrice || !productQuantity || !productCategory) {
        return res.status(400).json({ error: "All required fields must be filled" });
      }
  
      let uploadedImages = [];
  
      // Check if `productImages` is provided and is an array
      if (productImages && Array.isArray(productImages)) {
        for (const image of productImages) {
          // Upload each image to Cloudinary
          const uploadedImage = await cloudinary.uploader.upload(image, {
            folder: "dream bazar", // Cloudinary folder name
          });
          uploadedImages.push(uploadedImage.secure_url); // Push the secure URL of each image
        }
      }
  
      // Create a new product instance
      const newProduct = new AffilateMarketingProducts({
        productName,
        productTotalPrice,
        productQuantity,
        productImages: uploadedImages, // Use the array of uploaded image URLs
        productCategory,
        instruction,
      });
  
      // Save the product to MongoDB
      const savedProduct = await newProduct.save();
  
      // Respond with success and the saved product
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error adding new product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  

  export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params; // Get the product ID from the URL parameters
      const updateData = req.body; // Get the fields to update from the request body
      
      // Update the product using findByIdAndUpdate
      const updatedProduct = await AffilateMarketingProducts.findByIdAndUpdate(
        id,                     // The ID of the product to update
        updateData,             // The new data to update the product with
        { new: true }           // Return the updated document
      );
      
      // Check if the product exists
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      // Respond with the updated product
      res.status(200).json(updatedProduct);
    } catch (error) {
      // Handle errors
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
  
    }
  }

  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params; // Get the product ID from the URL parameters
      
      // Delete the product using findByIdAndDelete
      const deletedProduct = await AffilateMarketingProducts.findByIdAndDelete(id);
      
      // Check if the product exists
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      // Respond with success message
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      // Handle errors
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
