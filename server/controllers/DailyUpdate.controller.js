import { DailyUpdate } from "../models/DailyUpdate.modal.js";

// Function to handle submission of a daily update
export const SubmitDailyUpdate = async (req, res) => {
  const { description, sellerId, sellerName, userDate } = req.body;
  console.log({ description, sellerId, sellerName, userDate })

  // Validate required fields
  if (!description || !sellerId || !sellerName || !userDate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new daily update document
    const newUpdate = new DailyUpdate({
    description,
    sellerId,
    sellerName,
    userDate,
    });

    // Save the update to the database
    const savedUpdate = await newUpdate.save();

    // Respond with the saved update
    res.status(201).json(savedUpdate);
  } catch (error) {
    console.error("Error submitting daily update:", error);
    res.status(500).json({
    message: "An error occurred while submitting the daily update.",
    });
  }
};

export const getAllUpdates = async (req, res) => {
    try {
      const updates = await DailyUpdate.find().sort({createdAt: -1})
      res.status(200).json(updates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };

export const Updatesforseller = async (req, res) => {
    const {id} = req.params;
      try {
        // Fetch all orders from the database
        
        const Updates = await DailyUpdate.find({ sellerId: id }).sort({ createdAt: -1 });
        if (!Updates) {
            return res.status(404).json({ error: "No complaints found for this seller." });
        }
    
        // Respond with the retrieved orders
        res.status(200).json(Updates);
      } catch (error) {
        // Handle any errors
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};
