import express from 'express';
import { addBallanceToSeller, deleteOrder, getAllAffilateOrders, getAllAffilateOrdersForSeller, submitNewOrder, updateOrder, updateOrderStatus } from '../controllers/AffilateMarkiting.controller.js';

const router = express.Router();

router.post("/submitorder/affilate/team", submitNewOrder);
router.post("/updateorder/affilate/team/update/:id", updateOrder);
router.post("/updateorderstatus/affilate/team/status/:id", updateOrderStatus);
router.get("/getorder/affilate/ceo", getAllAffilateOrders);
router.get("/getorder/affilate/team/:id", getAllAffilateOrdersForSeller);
router.post("/update/ballance/affilate/team/:id", addBallanceToSeller);
router.delete("/delete/affilate/team/:id", deleteOrder);

// products




export default router