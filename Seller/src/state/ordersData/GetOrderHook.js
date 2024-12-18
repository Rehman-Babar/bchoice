// ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//  Async thunk for fetching orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/client/getallorders`);
  const data = await response.json();

  // Separate orders by category without overlaps
  const newArrivalOrders = [];
  const bestSellerOrders = [];
  const customGiftOrders = [];
  const otherOrders = [];

  data.forEach(order => {
    if (order.order_items.some(item => item.category === "New Arrival")) {
      newArrivalOrders.push(order);
    } else if (order.order_items.some(item => item.category === "Best Seller")) {
      bestSellerOrders.push(order);
    } else if (order.order_items.some(item => item.category === "Custom Gift")) {
      customGiftOrders.push(order);
    } else {
      otherOrders.push(order);
    }
  });

  return {
    allOrders: data,
    newArrivalOrders,
    bestSellerOrders,
    customGiftOrders,
    otherOrders,
  };
});

// Slice for orders state management
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    newArrivalOrders: [],
    bestSellerOrders: [],
    customGiftOrders: [],
    allOtherOrders: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {}, // No additional reducers needed

  // Extra reducers to handle the fetchOrders async thunk states
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.allOrders;
        state.newArrivalOrders = action.payload.newArrivalOrders;
        state.bestSellerOrders = action.payload.bestSellerOrders;
        state.customGiftOrders = action.payload.customGiftOrders;
        state.allOtherOrders = action.payload.otherOrders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors for accessing specific categories in the state
export const selectNewArrivalOrders = (state) => state.orders.newArrivalOrders;
export const selectBestSellerOrders = (state) => state.orders.bestSellerOrders;
export const selectCustomGiftOrders = (state) => state.orders.customGiftOrders;
export const selectOtherOrders = (state) => state.orders.allOtherOrders;

export default ordersSlice.reducer;
