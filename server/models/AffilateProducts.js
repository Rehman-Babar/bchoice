import mongoose from "mongoose";

const AffilateProductsSchema = new mongoose.Schema(
  {
    // products
    productName: { type: String, default:"" }, 
    productQuantity: { type: String, default:"" },
    productTotalPrice: { type: String, default:"" },
    productImages: { type: [String], default: [] },
    productCategory: { type: String, default:"" },
    instruction: { type: String, default:"",}
  },
  { timestamps: true }
);

export const AffilateMarketingProducts = mongoose.model("AffilateMarketingProducts", AffilateProductsSchema);