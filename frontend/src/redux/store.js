import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import companySlice from "./companySlice";

// Persist configuration
const persistConfig = {
  key: "root", // Key for the persisted state
  version: 1, // Version of the persisted state
  storage, // Storage engine (localStorage by default)
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  company: companySlice,
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