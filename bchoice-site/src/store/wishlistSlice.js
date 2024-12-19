import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage if available, otherwise use an empty array
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("wishlistItems");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn("Failed to load wishlist from localStorage", e);
    return [];
  }
};

const initialState = {
  wishlistItems: loadFromLocalStorage(),
};

const saveToLocalStorage = (wishlistItems) => {
  try {
    const serializedState = JSON.stringify(wishlistItems);
    localStorage.setItem("wishlistItems", serializedState);
  } catch (e) {
    console.warn("Failed to save wishlist to localStorage", e);
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.wishlistItems.push(action.payload);
        saveToLocalStorage(state.wishlistItems); // Save to localStorage after updating
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== itemId);
      saveToLocalStorage(state.wishlistItems); // Save to localStorage after updating
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
