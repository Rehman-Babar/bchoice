import mongoose from "mongoose";

const investmentsSchema = new mongoose.Schema({
    userName: { type: 'string', required: true},
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "BuyerAndSeller", required: true },
    investmentAmount: {
        type: Number,
        default: 0
    },
    investmentCtr: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export const InvestMents = mongoose.model("InvestMents", investmentsSchema);
