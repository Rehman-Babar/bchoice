import mongoose from "mongoose";

const AffilateSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    clientName: { type: String, required: true },
    phoneNumber1: { type: String, required: true,},
    phoneNumber2: { type: String,}, // Optional
    email: { type: String  },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "BuyerAndSeller", required: true },
    priority: { type: Boolean, default: false },
    mainCity: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    cod: { type: Number, default:0 }, // Cash on Delivery
    product: { type: String, required: true },
    clientAddress: { type: String, required: true },
    instruction: { type: String, default: "" },
    status: { type: String, default: "Booked" }, // pending, confirmed, delivered, rejected
    isOrderpayed: { type: Boolean, default:false }, // pending, confirmed, delivered
     sellerPersonalBallance:{type:String, default: ""},// for user
     sellerPersonalBallanceForCompany:{type:String, default: ""},// for user
    gender:{type:String, default:""},
    paidOrNot:{type:String, default:""},
  },
  { timestamps: true }
);

export const AffilateMarketing = mongoose.model("AffilateMarketing", AffilateSchema);
