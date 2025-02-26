import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';

// Create a Redux store using Redux Toolkit.
const store = configureStore({
  reducer: {
    // Add the apiSlice reducer to the store.
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Add the apiSlice middleware to the store.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Enable Redux DevTools extension if available.
  devTools: true
});

export default store;