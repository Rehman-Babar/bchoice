import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  addProduct,
  getAddedProducts,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/addproducts", addProduct);
router.get("/getAddedProducts", getAddedProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
