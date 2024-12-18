import express from 'express';
import { approveSinglePayment, createPaymentRequest, deletePayment, getApprovedRequests, getHistoryForSeller, getUnapprovedRequests } from '../controllers/Payment.controller.js';


const router = express.Router();

router.get("/approved/history", getApprovedRequests);
router.post("/submitrequest/affilate/team", createPaymentRequest);
router.get("/submitrequest/affilate/seller/:id", getHistoryForSeller);
router.get("/unapproved", getUnapprovedRequests);
// admin updates
// Route to delete a payment
router.delete("/unapproved/admin/:id", deletePayment);

// Route to approve a single payment
router.post("/unapproved/approve/admin/:id", approveSinglePayment);




export default router