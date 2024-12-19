// store/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  shipping_method: "",
  payment_method: "",
  total_amount: 0,
  order_items: [],
  created_at: "",
};

const orderSlice = createSlice({
  name: "orderConfermation",
  initialState,
  reducers: {
    saveOrderData: (state, action) => {
      // Updates state with the new order data
      const {
        id,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
        shipping_method,
        payment_method,
        total_amount,
        order_items,
        created_at,
      } = action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.city = city;
      state.postalCode = postalCode;
      state.shipping_method = shipping_method;
      state.payment_method = payment_method;
      state.total_amount = total_amount;
      state.order_items = order_items;
      state.created_at = created_at;
    },
  },
});

export const { saveOrderData } = orderSlice.actions;
export default orderSlice.reducer;
