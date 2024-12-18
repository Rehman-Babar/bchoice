import express from 'express';
import { createInvestment, deleteInvestments, getInvestments, sellerInvestment } from '../controllers/Investments.controller.js';

const router = express.Router();

router.post("/send", createInvestment);
router.get("/get", getInvestments);
router.get("/seller/investment/:id", sellerInvestment);
router.delete("/delete/investment/:id", deleteInvestments);



export default router