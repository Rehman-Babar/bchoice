import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import ordersReducer from "state/ordersData/GetOrderHook.js";
import allOrdersReducer from "state/ordersData/getOrdersForDashboard";
import productsReducer from "state/newArrivalAndBestSeller.js";
import BestSellerproductsReducer from "state/bestSellingProducts.js";
import customGiftsProductsReducer from "state/cutomGiftProducts.js";
import authReducer from "state/auth/auth.js";
import allproductsReducer from "state/allproducts.js";
import affilateordersReducer from "state/AffilateOrder/ordersForAffilate.js";
import paymentHistoryReducer from "state/payment/history.js";


const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    orders: ordersReducer,
    allOrders: allOrdersReducer,
    products: productsReducer,
    BestSeller: BestSellerproductsReducer,
    customGiftsProducts: customGiftsProductsReducer,
    auth:authReducer,
    allproducts:allproductsReducer,
    affilateorders:affilateordersReducer,
    paymentHistory:paymentHistoryReducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
