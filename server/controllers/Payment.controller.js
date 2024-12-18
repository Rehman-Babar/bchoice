import { AffilateMarketing } from "../models/AffilateMarkiting.modal.js";
import { BuyerAndSeller } from "../models/buyerAndSeller.js";
import Withdrawal from "../models/PaymentModal.js";


export const createPaymentRequest = async (req, res) => {
  try {
    const {
      accountHolderName,
      phoneNumber,
      amount,
      bankNumber,
      bankName,
      sellerId,
      paymentMethod,
    } = req.body;

    // Validate the required fields
    if (!accountHolderName || !amount || !paymentMethod || !sellerId) {
      return res
        .status(400)
        .json({ error: "Account holder name, amount, payment method, and sellerId are required." });
    }

    // Check if the amount is valid
    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid payment amount." });
    }

    // Find all documents associated with the sellerId
    const sellerDocuments = await AffilateMarketing.find({ sellerId });
    if (!sellerDocuments || sellerDocuments.length === 0) {
      return res.status(404).json({ error: "Seller not found or no balance available." });
    }

    let remainingAmount = amount; // Track the remaining amount to deduct

    for (const document of sellerDocuments) {
      // Deduct from sellerPersonalBallance if it has a positive balance
      if (document.sellerPersonalBallance > 0) {
        const deduction = Math.min(document.sellerPersonalBallance, remainingAmount); // Deduct up to remainingAmount
        document.sellerPersonalBallance -= deduction; // Update the balance
        remainingAmount -= deduction; // Decrease the remaining amount to deduct

        // Save the updated document
        await document.save();

        // If the required amount has been deducted, exit the loop
        if (remainingAmount <= 0) break;
      }
    }

    // If there is still remaining amount after checking all documents, return an error
    if (remainingAmount > 0) {
      return res.status(400).json({ error: "Insufficient balance to create payment request." });
    }

    // Create a new withdrawal request
    const newRequest = new Withdrawal({
      accountHolderName,
      phoneNumber,
      amount,
      bankNumber,
      bankName,
      sellerId,
      paymentMethod,
      isApproved: false, // Default approval status
      pandingWidrawl: amount,
    });

    // Save the request to the database
    await newRequest.save();

    res.status(201).json({
      message: "Payment request created successfully.",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating payment request:", error);
    res.status(500).json({ error: "Failed to create payment request.", error });
  }
};


export const getAllPaymentRequests = async (req, res) => {}

// Controller for fetching approved requests
export const getApprovedRequests = async (req, res) => {
  try {
    const approvedRequests = await Withdrawal.find({ isApproved: true }).sort({ createdAt: -1 });
    if (approvedRequests.length < 0 || !approvedRequests){
      return res.status(404).json({ error: "No approved requests found." });  // If no approved requests found, return a 404 status code and message. 404 means not found. 200 means OK.   // If no approved requests are found, return an empty array.  This prevents a null response from being sent.  This is a good practice to follow.  If you don't return an empty array, you'll get a null response.  But if the array is empty, it's clear that no approved requests were found.  This makes the response easier to read.  The user doesn't have to check if the array is empty.  They just know that no approved requests were found.  This makes the API response easier to understand and use.  The user doesn't have to worry about the array being null.  The array will be empty if no approved requests are found.  This is a
    }
    res.status(200).json(approvedRequests);
  } catch (error) {
    console.error("Error fetching approved requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch approved requests.",
      error: error.message,
    });
  }
};

// Controller for fetching pending/unapproved requests
export const getUnapprovedRequests = async (req, res) => {
  try {
    const unapprovedRequests = await Withdrawal.find({isApproved: false,}).sort({ createdAt: -1 });
    
    res.status(200).json(unapprovedRequests);
  } catch (error) {
    console.error("Error fetching unapproved requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch unapproved requests.",
      error: error.message,
    });
  }
};

export const getHistoryForSeller = async (req, res) => {
    const {id} = req.params;
      try {
        // Fetch all orders from the database
        
        const payments = await Withdrawal.find({ sellerId: id }).sort({ createdAt: -1 });
    
        // Respond with the retrieved orders
        res.status(200).json(payments);
      } catch (error) {
        // Handle any errors
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};

// delete single payment
export const deletePayment = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the payment by ID
    const payment = await Withdrawal.findById(id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    // Find the seller's balance document
    const sellerDocument = await AffilateMarketing.findOne({ sellerId: payment.sellerId });
    if (!sellerDocument) {
      return res.status(404).json({ error: "Seller not found or no balance document available" });
    }

    // Update the seller's personal balance
    sellerDocument.sellerPersonalBallance += payment.amount;
    await sellerDocument.save();

    // Delete the payment record
    await Withdrawal.findByIdAndDelete(id);

    res.status(200).json({ message: "Payment deleted successfully and balance restored to seller" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ message: "Failed to delete payment and restore balance" });
  }
};


// Approve single payment
// export const approveSinglePayment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Find the payment by ID
//     const payment = await Withdrawal.findById(id);
//     if (!payment) return res.status(404).json({ error: "Payment not found" });

//     // Update payment details
//     payment.isApproved = true;
//     payment.status = "completed";
//     payment.totalWidrawl = payment.amount; // Ensure correct spelling
//     payment.pandingWidrawl = ""; // Corrected field name

//     // Find the seller by ID
//     const seller = await AffilateMarketing.findById(payment.sellerId);
//     if (!seller) {
//       return res.status(404).json({ error: "Seller not found" });
//     }

//     // Update seller balance
//     seller.sellerPersonalBallance = "";

//     // Save updates
//     await payment.save(); // Save the payment updates
//     await seller.save(); // Save the seller updates

//     // Respond with the updated payment
//     res.status(200).json(payment);
//   } catch (error) {
//     console.error("Error approving payment:", error);
//     res.status(500).json({ message: "Failed to approve payment" });
//   }
// };




export const approveSinglePayment = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the payment by ID
    const payment = await Withdrawal.findById(id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    // Check if payment amount is valid
    const totalAmount = payment.amount;
    if (totalAmount <= 0) {
      return res.status(400).json({ error: "Invalid payment amount" });
    }

    // Update the payment as approved
    payment.isApproved = true;
    payment.status = "completed";
    payment.totalWidrawl = totalAmount; // Set the total withdrawal amount
    payment.pandingWidrawl = ""; // Clear pending withdrawal field if necessary
    await payment.save(); // Save the payment updates

    // Respond with the updated payment
    res.status(200).json({ message: "Payment approved successfully", payment });
  } catch (error) {
    console.error("Error approving payment:", error);
    res.status(500).json({ message: "Failed to approve payment" });
  }
};

