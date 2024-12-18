import mongoose from "mongoose";

const InCommingProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    discount: { type: Number, default: 0 },
    newPrice: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    productImage: { type: String, default: "" },
    productImages: { type: [String], default: [] },
    hoverImage: { type: String, default: "" },
    unitsInStock: { type: Number, default: 0 },
    category: { type: String, required: true },
    reviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    videoUrl: { type: [String], default: [] },
    brand:{type: String, default: ""},
    type:{type: String, default: ""},
    size:{type: String, default: ""},
    quality:{type: String, default: ""},
    colors:{type: String, default: ""},
    warranty:{type: String, default: ""},
    // Add more fields as needed...
    description: {
      type: String,
      default: "No description provided.",
    },
    shortDescription: {
      type: String,
      default: "No description provided.",
    },
  },
  { timestamps: true }
);

const InCommingProduct = mongoose.model("InCommingProduct", InCommingProductSchema);
export default InCommingProduct;
