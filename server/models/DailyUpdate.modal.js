import mongoose from "mongoose";

const DailyUpdateSchema = new mongoose.Schema(
  {
    description: {type:String, required:true},
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "BuyerAndSeller", required: true },
    sellerName:{ type: String, required: true },
    userDate:{ type: String, required: true}
  },
  { timestamps: true }
);

export const DailyUpdate = mongoose.model("DailyUpdate", DailyUpdateSchema);
