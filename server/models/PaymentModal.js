import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
  accountHolderName: { type: String, required: true },
  phoneNumber: { type: String },
  amount: { type: Number, required: true },
  bankNumber: { type: String,  },
  bankName: { type: String },
  status: { type: String, default: "Pending" }, 
  pandingWidrawl: { type: String, default: "" }, 
  totalWidrawl: { type: String, default: "" }, 
  sellerId: { type: String, required: true, },
  isApproved: { type: Boolean, default: false },
  paymentMethod: { type: String}
  
},
 { timestamps: true }
);

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

export default Withdrawal;
