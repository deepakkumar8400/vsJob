// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from './jobSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
  },
});

export default store;