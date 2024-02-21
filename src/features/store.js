import { configureStore } from "@reduxjs/toolkit";
import darkModeReducers from "./darkModeSlice.js";
import authSlice from "./authSlice.js";
import projectSlice from "./projectSlice.js";

const store = configureStore({
  reducer: {
    theme: darkModeReducers,
    auth: authSlice,
    project: projectSlice,
  },
});

export default store;
