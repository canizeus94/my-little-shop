import { createSlice } from '@reduxjs/toolkit';

// Check if there is already an instance of cart.
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []};

// Create the Cart Slice.
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {}
});

export default cartSlice.reducer;