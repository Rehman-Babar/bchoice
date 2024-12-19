import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  giftItems: [], // List of selected gift items
  totalAmount: 0, // Total price of all selected items
  hasCustomGift: false, // Flag to check if there's a custom gift
};

const giftSlice = createSlice({
  name: "gift",
  initialState,
  reducers: {
    // Add item to the gift
    addToGift: (state, action) => {
      const existingItem = state.giftItems.find((item) => item.id === action.payload.id);

      if (!existingItem) {
        // Add new item
        state.giftItems.push({
          id: action.payload.id,
          name: action.payload.name,
          imageUrl: action.payload.imageUrl,
          price: action.payload.price,
          isCustom: action.payload.isCustom, // Check if the item is custom
        });

        // Set flag if the added item is a custom gift
        if (action.payload.isCustom) {
          state.hasCustomGift = true;
        }

        // Update totalAmount, ensuring price is a valid number
        const itemPrice = parseFloat(action.payload.price.replace("Rs ", "").replace(",", ""));
        if (!isNaN(itemPrice)) {
          state.totalAmount += itemPrice;
        }
      }
    },

    // Remove item from the gift
    removeFromGift: (state, action) => {
      const existingItem = state.giftItems.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // Update totalAmount, ensuring price is a valid number
        const itemPrice = parseFloat(existingItem.price.replace("Rs ", "").replace(",", ""));
        if (!isNaN(itemPrice)) {
          state.totalAmount -= itemPrice;
        }

        // Remove item from giftItems array
        state.giftItems = state.giftItems.filter((item) => item.id !== action.payload.id);

        // Update flag if no more custom gifts are present
        state.hasCustomGift = state.giftItems.some((item) => item.isCustom);
      }
    },
  },
});

export const { addToGift, removeFromGift } = giftSlice.actions;

export default giftSlice.reducer;
