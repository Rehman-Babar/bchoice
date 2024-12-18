import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the entire order schema
const orderSchema = new Schema({
  // Contact Information as an embedded document
  email: {
    type: String,
    required: true,
  },

  // Delivery Address as an embedded document
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },

  // Order items as an array of embedded documents
  order_items: [
    {
      item_name: {
        type: String,
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        // required: true,
      },
    },
  ],

  // Payment and Shipping Information
  total_amount: {
    type: Number,
    required: true,
  },

  payment_method: {
    type: String,
    required: true,
  },
  shipping_method: {
    type: String,
    required: true,
  },
  shipping_cost: {
    type: Number,
    // required: true,
  },

  // TODO status fields
  status: {
    type: String,
    enum: ["InProgress", "Dispatched", "Delivered", "Returned", "Cancelled", "Issued" ],
    default: "InProgress",
  },
  
  // Automatically add timestamps (createdAt, updatedAt)
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Define the Order model using the schema
const Order = mongoose.model("Order", orderSchema);

export default Order;
