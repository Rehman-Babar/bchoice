import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import authRoutes from "./routes/auth.routes.js";
import buyerAndSellerRoutes from "./routes/buyerAndSeller.routes.js";
import  AffilateRoutes from "./routes/AffilateMarkiting.routes.js";
import  complantsRoutes from "./routes/Complantes.routes.js";
import  SupperSupportRoutes from "./routes/SupperSupport.route.js";
import  dailyUpdatesRoutes from "./routes/DailyUpdate.routes.js";
import  AffilateProductsRoutes from "./routes/AffilateProducts.routes.js";
import  paymentRoutes from "./routes/Payment.routes.js";
import  investRoutes from "./routes/Investment.route.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

import cookieParser from "cookie-parser";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const __dirname = path.resolve();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ROUTES */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v2/auth", buyerAndSellerRoutes);
app.use("/api/v3/affilate", AffilateRoutes);
app.use("/api/v3/products", AffilateProductsRoutes);
app.use("/api/v4", complantsRoutes);
app.use("/api/v5", SupperSupportRoutes);
app.use("/api/v6/dailyupdate", dailyUpdatesRoutes);
app.use("/api/v7/payment", paymentRoutes);
app.use("/api/v8/invest", investRoutes);
app.use("/client", clientRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
