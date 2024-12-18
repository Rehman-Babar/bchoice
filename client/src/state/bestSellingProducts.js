import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Define an async thunk for fetching all products
export const fetchBestSellerProducts = createAsyncThunk("BestSeller/fetchProducts", async () => {
  const catagry = "Best Seller";
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/client/bestselling/${catagry}`);
  const data = await res.json();
  return data;
});

// Step 2: Create a slice for products
const BestSellerproductsSlice = createSlice({
  name: "BestSeller",
  initialState: {
    items: [], // Holds all the products
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSellerProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Load all products at once
      })
      .addCase(fetchBestSellerProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default BestSellerproductsSlice.reducer;
