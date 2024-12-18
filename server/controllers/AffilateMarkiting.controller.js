import { AffilateMarketing } from "../models/AffilateMarkiting.modal.js";
import { v2 as cloudinary } from "cloudinary";

// Controller to handle new order submission
export const submitNewOrder = async (req, res) => {
  try {
    // Destructure fields from request body
    const {
      orderId,
      clientName,
      phoneNumber1,
      phoneNumber2,
      email,
      priority,
      mainCity,
      totalAmount,
      paidAmount,
      cod,
      product,
      clientAddress,
      instruction,
      status,
      sellerId,
      gender,
      paidOrNot
    } = req.body;

    // Validate required fields (you can enhance validation here)
    if (
      !orderId ||
      !clientName ||
      !phoneNumber1 ||
      !mainCity ||
      !totalAmount ||
      !product ||
      !clientAddress ||
      !gender ||
      !paidOrNot
    ) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Create a new order instance
    const newOrder = new AffilateMarketing({
      orderId,
      clientName,
      phoneNumber1,
      phoneNumber2,
      email,
      priority,
      mainCity,
      totalAmount,
      paidAmount,
      cod,
      product,
      clientAddress,
      instruction,
      status,
      sellerId,
      gender,
      paidOrNot
    });

    // Save the order to MongoDB
    const savedOrder = await newOrder.save();

    // Respond with success and the saved order
    res.status(201).json(savedOrder);
  } catch (error) {
    // Handle any errors
    console.error("Error submitting new order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
    try {
      const { id } = req.params; // Get the order ID from the URL parameters
      const updateData = req.body; // Get the fields to update from the request body
  
      // Update the order using findByIdAndUpdate
      const updatedOrder = await AffilateMarketing.findByIdAndUpdate(
        id,                     // The ID of the order to update
        updateData,             // The new data to update the order with
        { new: true }           // Return the updated document
      );
  
      // Check if the order exists
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Respond with the updated order
      res.status(200).json(updatedOrder);
    } catch (error) {
      // Handle errors
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  export const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params; // Extract order ID from URL
      const { status } = req.body; // Extract new status from the request body
  
      // Validate input
      if (!status) {
        return res.status(400).json({ message: "Status is required." });
      }
  
      // Find and update the order in the database
      const updatedOrder = await AffilateMarketing.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      // Success response
      res.status(200).json({
        message: "Order status updated successfully.",
        order: updatedOrder,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  
export const getAllAffilateOrders = async (req, res) => {
    try {
      // Fetch all orders from the database
      const orders = await AffilateMarketing.find().sort({createdAt: -1})
  
      // Respond with the retrieved orders
      res.status(200).json(orders);
    } catch (error) {
      // Handle any errors
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
export const getAllAffilateOrdersForSeller = async (req, res) => {
  const {id} = req.params;
    try {
      // Fetch all orders from the database
      
      const orders = await AffilateMarketing.find({ sellerId: id }).sort({ createdAt: -1 });
  
      // Respond with the retrieved orders
      res.status(200).json(orders);
    } catch (error) {
      // Handle any errors
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };  

  export const addBallanceToSeller = async (req, res) => {
    const { id } = req.params;
    const { sellerPersonalBallance, isOrderpayed } = req.body;
  
    try {
      // Find the seller by ID
      const seller = await AffilateMarketing.findById(id);
  
      if (!seller) {
        return res.status(404).json({ message: "Seller not found." });
      }
  
      // Calculate new value for sellerPersonalBallanceForCompany
      const updatedSellerPersonalBallanceForCompany = 
        (seller.sellerPersonalBallanceForCompany || "" ) + sellerPersonalBallance;
  
      // Update seller details
      const updatedSeller = await AffilateMarketing.findByIdAndUpdate(
        id,
        {
          sellerPersonalBallance,
          isOrderpayed,
          sellerPersonalBallanceForCompany: updatedSellerPersonalBallanceForCompany,
        },
        { new: true }
      );
  
      res.status(200).json({ success: true, data: updatedSeller });
    } catch (error) {
      console.error("Error updating seller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
// delete order
export const deleteOrder =async (req, res) => {
const {id} = req.params;
try {
  // Validate input
  if (!id) {
    return res.status(400).json({ message: "Order ID is required." });
  }
  // Find and delete the order in the database
  const deletedOrder = await AffilateMarketing.findByIdAndDelete(id);
  
  if (!deletedOrder) {
    return res.status(404).json({ message: "Order not found." });
  }
  
  // Success response
  res.status(200).json({ message: "Order deleted successfully." });

} catch (error) {
  
}
};

