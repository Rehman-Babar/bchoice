import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  addProduct,
  getAddedProducts,
} from "../controllers/client.js";
import CreateOrder, { GetAllOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/addproducts", addProduct);
router.get("/getallorders", GetAllOrder);
router.post("/confiremOrder", CreateOrder);
router.post("/confiremOrder", CreateOrder);
router.get("/getAddedProducts", getAddedProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
