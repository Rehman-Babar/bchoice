// ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk("allorders/fetchAllOrders", async () => {
  const response = await fetch("https://admin-server-98to.onrender.com/client/getallorders");
  const data = await response.json();
  console.log("allOrders", data)
  return data; // Return the entire order data as-is
});

// Slice for all orders state management
const ordersSlice = createSlice({
  name: "allOrders",
  initialState: {
    allOrders: [], // Only a single state to store all orders
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},

  // Extra reducers to handle the fetchAllOrders async thunk states
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allOrders = action.payload; // Store all fetched orders here
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selector to access all orders
export const selectAllOrders = (state) => state.orders.allOrders;

export default ordersSlice.reducer;
