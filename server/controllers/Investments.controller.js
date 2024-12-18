import { all } from "axios";
import { InvestMents } from "../models/Investments.modal.js";

export const createInvestment = async (req, res) => {
    const {investmentAmount,investmentCtr,userName, sellerId } = req.body;
    try {
        if (!investmentAmount || !investmentCtr || !userName || !sellerId) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newInvestment = new InvestMents({ 
            investmentAmount,
                investmentCtr,  
                userName,
                sellerId,
            });
            await newInvestment.save();
            res.status(201).json(newInvestment);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
        
    }
  }
// get all
  
// export const getInvestments = async (req, res) => {
//     try {
//         const investments = await InvestMents.find().sort({ investmentDate: -1 });
//         res.json(investments);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server Error" });
//     }
// }

export const getInvestments = async (req, res) => {
    try {
        const investments = await InvestMents.find().sort({ createdAt: -1 });
        if (investments.length <= 0 || !investments) {
            return res.status(404).json({ message: "No investments found" });
        }
        res.json(investments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}


export const sellerInvestment = async (req, res) => {
    const { id } = req.params; // Extract the user's ID from the request parameters

    try {
        // Validate that an ID is provided
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Fetch investments for the user, sorted by the most recent
        const investments = await InvestMents.find({ sellerId: id }).sort({ createdAt: -1 });

        // Check if any investments exist
        if (!investments) {
            return res.status(404).json({ error: "No previous investments found for this user."});
        }

        // Respond with the list of investments
        res.status(200).json( investments );
    } catch (error) {
        console.error("Error fetching investments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// del investments
export const deleteInvestments = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Find the investment by ID
        const investment = await InvestMents.findByIdAndDelete(id);
        if (!investment) return res.status(404).json({ error: "Investment not found" });
        res.status(200).json({ message: "Investment deleted successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    
    }

}

