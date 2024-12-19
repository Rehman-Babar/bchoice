import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Define an async thunk for fetching all products
export const fetchCatagory3 = createAsyncThunk("catagory3/fetchProduct", async ({ category }) => {
  const res = await fetch(`${import.meta.env.VITE_KEY}/client/custom-gift/${category}`);
  const data = await res.json();
  console.log(data);
  return data;
});

// Step 2: Create a slice for products
const catagory3Slice = createSlice({
  name: "catagory3",
  initialState: {
    items: [], // Holds all the products
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatagory3.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCatagory3.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Load all products at once
      })
      .addCase(fetchCatagory3.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default catagory3Slice.reducer;
