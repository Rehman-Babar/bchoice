import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Define an async thunk for fetching all products
export const fetchAllProducts = createAsyncThunk("allproducts/fetchAllProducts", async () => {
  const res = await fetch("/client/allproduct/home/bestselling");
  const data = await res.json();
  console.log('data', data);
  return data;
});

// Step 2: Create a slice for products
const productsSlice = createSlice({
  name: "allproducts",
  initialState: {
    items: [], // Holds all the products
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds any error messages
  },
  reducers: {
    addProductLocally: (state, action) => {
      state.items.push(action.payload); // Add the new product to the items array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Load all products at once
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addProductLocally } = productsSlice.actions;

// Export the async thunk and the reducer
export default productsSlice.reducer;
