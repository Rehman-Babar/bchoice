import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Define an async thunk for fetching all products
export const fetchcustomGiftsProducts = createAsyncThunk("customGiftsProducts/fetchProducts", async () => {
  //   const catagry = "customGiftsProducts";
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/client/allproduct/bestselling/admin/customgift`);
  const data = await res.json();
  console.log(data);
  return data;
});

// Step 2: Create a slice for products
const customGiftsproductsSlice = createSlice({
  name: "customGiftsProducts",
  initialState: {
    items: [], // Holds all the products
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcustomGiftsProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcustomGiftsProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Load all products at once
      })
      .addCase(fetchcustomGiftsProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default customGiftsproductsSlice.reducer;
