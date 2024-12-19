import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Define an async thunk for fetching all products
export const fetchSingleProDuct = createAsyncThunk("SingleProDuct/fetchProduct", async ({ id }) => {
  const res = await fetch(`${import.meta.env.VITE_KEY}/client/bestselling/singleProduct/${id}`);
  const data = await res.json();
  // console.log(data);
  return data;
});

// Step 2: Create a slice for products
const SingleProDuctSlice = createSlice({
  name: "SingleProDuct",
  initialState: {
    items: [], // Holds all the products
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProDuct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProDuct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Load all products at once
      })
      .addCase(fetchSingleProDuct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default SingleProDuctSlice.reducer;
