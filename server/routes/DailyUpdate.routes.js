import express from "express";
import { getAllUpdates, SubmitDailyUpdate, Updatesforseller } from "../controllers/DailyUpdate.controller.js";

const router = express.Router();

// Route to create a complaint
router.post("/create", SubmitDailyUpdate);

// Route to get all complaints
router.get("/get/all/ceo", getAllUpdates);

// Route to get a specific complaint by ID
router.get("/seller/:id", Updatesforseller);


export default router;
