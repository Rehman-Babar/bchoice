import express from "express";
import {

  addProduct,
  getAddedProducts,
  CreateBestSellingOrder,
  getBestSellingProducts,
  AllProductForHomePage,
  getCustomGift,
  getBox,
  SingleProductForBestSellingAndEveryProduct,
  DeleteSingleProduct,
  getBestSellingProductsForAdmin,
  UpdateProduct,
  // SingleProductForBestSellingAndEveryProduct,
} from "../controllers/client.js";
import CreateOrder, { deleteOrder, GetAllOrder, singleOrder, UpdateOrderStatus } from "../controllers/order.controller.js";
// import multer from "multer";

const router = express.Router();

router.post("/addproducts", addProduct);
router.get("/getallorders", GetAllOrder);
router.delete("/delete/product/admin/:id", DeleteSingleProduct);

router.post("/update/anyproduct/admin/:id", UpdateProduct);
router.put("/order/update/order-status/:id", UpdateOrderStatus);



// order
router.post("/confiremOrder", CreateOrder);
router.get("/order/:id", singleOrder);
router.delete("/delete/:id", deleteOrder);
// router.get("/singleOrders/newarrival/orders/filter", NewArrivalsAndBestSellingOrders);
// 
router.post("/bestsellingorder", CreateBestSellingOrder);
router.get("/bestselling/:category", getBestSellingProducts);
router.get("/bestselling/singleProduct/:id", SingleProductForBestSellingAndEveryProduct);
router.get("/custom-gift/:category", getCustomGift);
router.get("/custom-box/:category", getBox);
router.get("/getAddedProducts", getAddedProducts);
router.get("/allproduct/home/bestselling", AllProductForHomePage);
router.get("/allproduct/bestselling/admin/customgift", getBestSellingProductsForAdmin);


export default router;
