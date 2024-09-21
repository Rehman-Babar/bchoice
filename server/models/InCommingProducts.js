import mongoose from "mongoose";

const InCommingProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    discount: { type: Number, default: 0 },
    newPrice: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    productImage: { type: String, default: "" },
    hoverImage: { type: String, default: "" },
    unitsInStock: { type: Number, default: 0 },
    category: { type: String, required: true },
    reviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const InCommingProduct = mongoose.model("InCommingProduct", InCommingProductSchema);
export default InCommingProduct;
