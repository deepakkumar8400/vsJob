// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { combineReducers } from "redux";

// Configuration for Redux Persist
const persistConfig = {
  key: "root", // Key for the persisted state
  version: 1, // Version of the persisted state
  storage, // Storage engine (localStorage by default)
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore these actions for serializability checks
      },
    }),
});

// Create a persistor object
export const persistor = persistStore(store);

export default store;