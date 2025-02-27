// src/index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { persistor } from "./redux/store"; // Import the persistor
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { PersistGate } from "redux-persist/integration/react";

// Create the root element
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provide the Redux store to the app */}
    <Provider store={store}>
      {/* PersistGate delays rendering until the persisted state is retrieved */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);