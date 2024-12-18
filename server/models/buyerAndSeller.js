import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true, // Still required because every user needs a full name
        unique: false,
    },
    email: {
        type: String,
        required: true, // Still required because email is mandatory
        unique: true, // Ensure email is unique across users
        lowercase: true, // Ensure email is saved in lowercase
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true, // Still required because password is mandatory
    },
    image: {
        type: String,
        default: "",
    },
    userName: {
        type: String,
        required: true, // Still         required because user name is mandatory
        unique: false,
    },
    fatherName: {
        type: String,
        required: true, // Still required because father name is mandatory
    },
    cnic: {
        type: String,
        required: true, // Still required because CNIC is mandatory
    },
    exactLocation: {
        type: String,
        required: true, // Still required because exact location is mandatory
    },
    role: {
        type: String,
        enum: ["buyer", "seller", "CEO"], // Enum roles
        default: "buyer", // Default to "buyer" unless explicitly specified
    },
    country: {
        type: String, // Optional, can be left blank
    },
    phoneNumber: {
        type: String, // Optional, can be left blank
    },
    profession: {
        type: String, // Optional, only for sellers
    },
    portfolio: {
        type: [String], // Optional, array of project links for sellers
    },
    description: {
        type: String, // Optional, description for sellers
    },
    accessApproved: {
        type: Boolean,
        default: false, // Default to not approved
    },
    accessRequests: {
        type: [
            {
                text: { type: String, required: true },
                route: { type: String, required: true },
                icon: { type: Object, default: {} }, // Adjust as needed
                items: { type: [Object], default: [] }
            }
        ],
        default: []
    }
    ,
    workingStatus: {
        type: String,
        default: "Excellent", // Default to "active" unless explicitly specified
    },
}, { timestamps: true });

export const BuyerAndSeller = mongoose.model("BuyerAndSeller", buyerSchema);
