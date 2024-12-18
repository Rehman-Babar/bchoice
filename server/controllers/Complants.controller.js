import { BcSupport } from "../models/Complaients.modal.js";

// 1. Create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const { title, complaint, sellerId,sellerName } = req.body;

    // Validate inputs
    if (!title || !complaint || !sellerId || !sellerName) {
      return res.status(400).json({ error: "Title, complaint, and sellerId are required." });
    }

    const newComplaint = new BcSupport({
      title,
      complaint,
      sellerId,
      status:   "Pending", // Default to "Pending" if no status is provided
      sellerName, // Additional field for seller name
    });

    await newComplaint.save();

    res.status(201).json({
      message: "Complaint created successfully",
      complaint: newComplaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 2. Get all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await BcSupport.find().sort({createdAt: -1})
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 3. Get a specific complaint by ID


export const bcsupportComplatsforseller = async (req, res) => {
    const {id} = req.params;
      try {
        // Fetch all orders from the database
        
        const ordecomplants = await BcSupport.find({ sellerId: id }).sort({ createdAt: -1 });
        if (!ordecomplants) {
            return res.status(404).json({ error: "No complaints found for this seller." });
        }
    
        // Respond with the retrieved orders
        res.status(200).json(ordecomplants);
      } catch (error) {
        // Handle any errors
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };

// 4. Update the status of a complaint
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, solution } = req.body;
    const { id } = req.params;

    // Validate status
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const complaint = await BcSupport.findById(id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    complaint.status = status; // Update the status field
    complaint.solution = solution;  // Update the solution field if provided
    await complaint.save();

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
