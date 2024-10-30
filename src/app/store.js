// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import unifiReducer from "../features/unifiSlice"; // Ensure the correct path

const store = configureStore({
  reducer: {
    unifi: unifiReducer,
  },
});

export default store;
