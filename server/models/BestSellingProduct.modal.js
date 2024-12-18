import mongoose from "mongoose";

const bestsellingProductSchema = new mongoose.Schema(
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
    // videoUrl:{ type: String, default: "" },
    videoUrl: { type: [String], default: [] },
    brand:{type: String, default: ""},
    size:{type: String, default: ""},
    quality:{type: String, default: ""},
    colors:{type: String, default: ""},
    warranty:{type: String, default: ""},
    description: {
      type: String,
      default: "No description provided.",
    },
    shortDescription: {
      type: String,
      default: "No description provided.",
    },
    type: {
      type: String,
      default: "No description provided.",
    },
  },
  { timestamps: true }
);

const BestSelling = mongoose.model("BestSelling", bestsellingProductSchema);
export default BestSelling;
