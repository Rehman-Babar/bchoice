import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch orders
export const fetchAffilateOrders = createAsyncThunk(
  "affilateorders/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v3/affilate/getorder/affilate/team/${userId}`
      );
      return response.data; // Successfully fetched orders
    } catch (error) {
      console.error("Error fetching orders:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

const ordersSlice = createSlice({
  name: "affilateorders",
  initialState: {
    data: [], // All fetched orders
    filteredData: [], // Filtered orders based on time range
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    totalPersonalBalance: 0, // Sum of all sellerPersonalBallance
  },
  reducers: {
    filterOrders: (state, action) => {
      const timeRange = action.payload;
      const now = new Date();

      const filtered = state.data.filter((order) => {
        const orderDate = new Date(order.createdAt);
        switch (timeRange) {
          case "Today":
            return (
              orderDate >= new Date(now.setHours(0, 0, 0, 0)) &&
              orderDate <= new Date(now.setHours(23, 59, 59, 999))
            );
          case "Yesterday":
            const yesterdayStart = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() - 1,
              0,
              0,
              0,
              0
            );
            const yesterdayEnd = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() - 1,
              23,
              59,
              59,
              999
            );
            return orderDate >= yesterdayStart && orderDate <= yesterdayEnd;
          case "This Week":
            const weekStart = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() - now.getDay()
            ).setHours(0, 0, 0, 0);
            return orderDate >= weekStart;
          case "Last Week":
            const lastWeekStart = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() - now.getDay() - 7
            ).setHours(0, 0, 0, 0);
            const lastWeekEnd = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() - now.getDay() - 1
            ).setHours(23, 59, 59, 999);
            return orderDate >= lastWeekStart && orderDate <= lastWeekEnd;
          case "This Month":
            return (
              orderDate.getMonth() === now.getMonth() &&
              orderDate.getFullYear() === now.getFullYear()
            );
          case "Last Month":
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastMonthEnd = new Date(
              now.getFullYear(),
              now.getMonth(),
              0,
              23,
              59,
              59,
              999
            );
            return orderDate >= lastMonth && orderDate <= lastMonthEnd;
          case "This Year":
            return orderDate.getFullYear() === now.getFullYear();
          case "Last Year":
            return orderDate.getFullYear() === now.getFullYear() - 1;
          case "All Time":
            return true; // No time filter, show all orders
          default:
            return true; // "All Time"
        }
      });

      // Update filtered data and recalculate total personal balance
      state.filteredData = filtered;
      state.totalPersonalBalance = filtered.reduce((total, order) => {
        const balance = parseFloat(order?.sellerPersonalBallance) || 0;
        return total + balance;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAffilateOrders.pending, (state) => {
        state.status = "loading";
        state.totalPersonalBalance = 0; // Reset balance while loading
      })
      .addCase(fetchAffilateOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;

        // Automatically filter for "This Month"
        const now = new Date();
        state.filteredData = action.payload.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        });

        // Calculate total personal balance for filtered data
        state.totalPersonalBalance = state.filteredData.reduce((total, order) => {
          const balance = parseFloat(order?.sellerPersonalBallance) || 0;
          return total + balance;
        }, 0);
      })
      .addCase(fetchAffilateOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.totalPersonalBalance = 0; // Reset balance on failure
      });
  },
});

export const { filterOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
