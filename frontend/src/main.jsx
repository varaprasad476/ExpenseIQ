import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TransactionProvider } from "./context/TransactionContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransactionProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TransactionProvider>
  </StrictMode>
);