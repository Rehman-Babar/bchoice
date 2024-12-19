import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Define an async thunk for fetching all products
export const fetchCatagory2 = createAsyncThunk("catagory2/fetchProduct", async ({ category }) => {
  const res = await fetch(`${import.meta.env.VITE_KEY}/client/custom-gift/${category}`);
  const data = await res.json();
  console.log(data);
  return data;
});

// Step 2: Create a slice for products
const catagory2Slice = createSlice({
  name: "catagory2",
  initialState: {
    items: [], // Holds all the products
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatagory2.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCatagory2.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Load all products at once
      })
      .addCase(fetchCatagory2.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default catagory2Slice.reducer;
