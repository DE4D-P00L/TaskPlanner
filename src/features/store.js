import { configureStore } from "@reduxjs/toolkit";
import darkModeReducers from "./darkModeSlice.js";
import authSlice from "./authSlice.js";

const store = configureStore({
  reducer: {
    theme: darkModeReducers,
    auth: authSlice,
  },
});

export default store;
