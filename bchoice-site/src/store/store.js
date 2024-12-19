import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import productsReducer from "./productSlice.js";
import giftReducer from "./giftSlice.js";
import giftProductReducer from "./giftSliceForProducts.js";
import catagory1ProductReducer from "./catagores/catagory1.js";
import catagory2ProductReducer from "./catagores/catagory2.js";
import catagory3ProductReducer from "./catagores/catagory3.js";
import catagory4ProductReducer from "./catagores/catagory4.js";
import singleProductReducer from "./everyProductAndBestSelling/singleProductOnTopProductCollextion.js";
import orderConfermationReducer from "./checkout/orderConfermation.js";

import wishlistReducer from "./wishlistSlice.js"; // if you want to add wishlist feature

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    gift: giftReducer,
    SingleProDuct: singleProductReducer,
    giftProduct: giftProductReducer,
    catagory1: catagory1ProductReducer,
    catagory2: catagory2ProductReducer,
    catagory3: catagory3ProductReducer,
    catagory4: catagory4ProductReducer,
    orderConfermation:orderConfermationReducer
  },
});

export default store;
