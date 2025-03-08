import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Check if there is already an instance of cart.
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

// Create the Cart Slice.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemExists = state.cartItems.find((x) => x._id === item._id);

      // If the item exists in our cartItems state return it
      // else add the cartItems to state.
      if (itemExists) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === itemExists._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // Reset state to prevent next user from inheriting previous users state.
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
