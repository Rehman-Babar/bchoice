import express from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/AffliateProducts.controller.js';

const router = express.Router();

// products
router.get("/products/all", getAllProducts);
router.post("/products/add", addProduct);
router.post("/products/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router