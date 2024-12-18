import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch orders
export const fetchPaymentHistory = createAsyncThunk(
  "paymentHistory/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v7/payment/submitrequest/affilate/seller/${userId}`
      );
      return response.data; // Successfully fetched orders
    } catch (error) {
      console.error("Error fetching orders:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

const ordersSlice = createSlice({
  name: "paymentHistory",
  initialState: {
    data: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    totalPendingWithdrawal: 0, // Field to store the sum of all pending withdrawals
    totalWithdrawn: 0, // Field to store the sum of all withdrawn amounts
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.status = "loading";
        state.totalPendingWithdrawal = 0;
        state.totalWithdrawn = 0; // Reset all balances while loading
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // Update orders data

        // Calculate the total pending withdrawals
        state.totalPendingWithdrawal = action.payload.reduce((total, order) => {
          const pending = parseFloat(order?.pandingWidrawl) || 0;
          return total + pending;
        }, 0);

        // Calculate the total withdrawn amounts
        state.totalWithdrawn = action.payload.reduce((total, order) => {
          const withdrawn = parseFloat(order?.totalWidrawl) || 0;
          return total + withdrawn;
        }, 0);
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.totalPersonalBalance = 0;
        state.totalPendingWithdrawal = 0;
        state.totalWithdrawn = 0; // Reset balances on failure
      });
  },
});

export default ordersSlice.reducer;
