import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Define an async thunk for fetching all products
export const fetchGiftProduct = createAsyncThunk("giftProduct/fetchGiftProduct", async ({ category }) => {
  const res = await fetch(`${import.meta.env.VITE_KEY}/client/custom-gift/${category}`);
  const data = await res.json();
  return data;
});

// Step 2: Create a slice for products
const giftProductSlice = createSlice({
  name: "giftProduct",
  initialState: {
    items: [], // Holds all the products
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds any error messages
  },
  reducers: {
    // Action to load remaining products
    loadRemainingProducts: (state) => {
      // No longer necessary since items will always contain all products.
      // You can implement pagination or filtering logic here if needed.
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiftProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGiftProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Store all products fetched
      })
      .addCase(fetchGiftProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the action to load remaining products if needed
export const { loadRemainingProducts } = giftProductSlice.actions;

// Export the async thunk and the reducer
export default giftProductSlice.reducer;
