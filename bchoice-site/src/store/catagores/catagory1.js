import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Define an async thunk for fetching all products
export const fetchCatagory1 = createAsyncThunk("catagory1/fetchProduct", async ({ category }) => {
  const res = await fetch(`${import.meta.env.VITE_KEY}/client/custom-gift/${category}`);
  const data = await res.json();
  console.log(data);
  return data;
});

// Step 2: Create a slice for products
const catagory1Slice = createSlice({
  name: "catagory1",
  initialState: {
    items: [], // Holds all the products
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatagory1.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCatagory1.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Load all products at once
      })
      .addCase(fetchCatagory1.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default catagory1Slice.reducer;
