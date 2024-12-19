import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  cartItems: [], // List of items in the cart
  totalAmount: 0, // Total cart amount
  hasCustomGift: false, // Flag to check if there's a custom gift
  selectedProductId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or update the quantity if it already exists
    addItemToCart: (state, action) => {
      const { id, quantity = 1, isCustom = false } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = Number(existingItem.quantity * existingItem.price); // Ensure it's a number
      } else {
        state.cartItems.push({
          ...action.payload,
          totalPrice: Number(action.payload.price * quantity), // Ensure it's a number
        });
      }

      // Check if a custom gift is added
      if (isCustom) {
        state.hasCustomGift = true;
      }

      // Recalculate the total amount
      state.totalAmount = state.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    },

    // Remove item from cart
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);

      // Update total amount after removal
      state.totalAmount = state.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

      // Check if all custom gifts are removed
      state.hasCustomGift = state.cartItems.some((item) => item.isCustom);
    },
    // Select a product for customization
    setSelectedProduct(state, action) {
      state.selectedProductId = action.payload;
    },

    // Update item quantity
    updateItemQuantity: (state, action) => {
      const { id, quantity, totalPrice } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice = totalPrice;

        // Ensure quantity doesn't go below 1
        if (existingItem.quantity < 1) {
          existingItem.quantity = 1;
          existingItem.totalPrice = existingItem.price; // Recalculate total price
        }
      }

      // Recalculate the total amount
      state.totalAmount = state.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    },

    // Reset cart
    resetCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.hasCustomGift = false; // Reset the gift items state
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, resetCart, setSelectedProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
