import Order from "../models/order.modal.js";
import mongoose from "mongoose";

const CreateOrder = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phone,
      order_items,
      total_amount,
      payment_method,
      shipping_method,
      category,
    } = req.body;
    if (
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !phone ||
      !order_items ||
      !total_amount ||
      !payment_method ||
      !shipping_method
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }
    const newOrder = new Order({
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      postalCode: postalCode, // Postal code is optional
      category,
      phone: phone,
      order_items: order_items.map((item) => ({
        item_name: item.item_name,
        quantity: item.quantity,
        price: item.price,
        productImage: item.productImage,
        category: item.category,
      })),
      total_amount: total_amount,
      payment_method: payment_method,
      shipping_method: shipping_method,
      // shipping_cost: shipping_cost,
    });
    const result = await newOrder.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

export const GetAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Failed to get orders", error: error.message });
  }
};


export const UpdateOrderStatus = async (req, res) => {
  const { id } = req.params; // Get orderID from route parameters
  const { status } = req.body; // Get new status from request body
  console.log(id)

  try {
    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true } // Return the updated document
    );

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};


export const singleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Failed to get order", error: error.message });
  }
};

// export const getCustomGiftOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       $or: [{ "order_items.category": "Box" }, { "order_items.category": "Best Seller" }],
//     }).sort({ created_at: -1 });

//     if (!orders) {
//       return res.status(404).json({ error: "Order Not Found" });
//     }
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching new arrivals orders:", error);
//     throw error; // Rethrow the error to handle it in your application
//   }
// };

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    console.log(order);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order", details: error.message });
  }
};

export default CreateOrder;
