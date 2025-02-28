import { createSlice } from '@reduxjs/toolkit';

// Check if there is already an instance of cart.
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []};

// Create the Cart Slice.
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const itemExists = state.cartItems.find((x) => x._id === item._id );
            
            // If the item exists in our cartItems state return it.
            if(itemExists) {
                state.cartItems = state.cartItems.map((x) => x._id === itemExists._id ? item : x);
            } else {
                // Add the state item to the cartItems state.
                state.cartItems = [...state.cartItems, item];
            }
        },
    },
});

export default cartSlice.reducer;