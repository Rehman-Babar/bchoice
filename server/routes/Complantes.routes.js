import express from "express";
import { bcsupportComplatsforseller, createComplaint, getAllComplaints, updateComplaintStatus } from "../controllers/Complants.controller.js";

const router = express.Router();

// Route to create a complaint
router.post("/complaints/create", createComplaint);

// Route to get all complaints
router.get("/complaints/get/all/ceo", getAllComplaints);

// Route to get a specific complaint by ID
router.get("/complaints/seller/:id", bcsupportComplatsforseller);


// Route to update complaint status
router.put("/complaints/:id/status", updateComplaintStatus);

export default router;
