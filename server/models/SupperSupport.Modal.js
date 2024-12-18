import mongoose from "mongoose";

const SupperSupportScema = new mongoose.Schema(
  {
    title:{type:String, required:true},
    complaint: {type:String, required:true},
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "BuyerAndSeller", required: true },
    sellerName:{ type: String, required: true },
    solution: {type: String , default: ""},
    status: { type: String, default: "Pending" }, // pending, confirmed, delivered, rejected
  },
  { timestamps: true }
);

export const SupperSupport = mongoose.model("SupperSupport", SupperSupportScema);
