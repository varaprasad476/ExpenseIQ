import { ThemeProvider } from "./context/ThemeContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>

      <AuthProvider>

        <TransactionProvider>

          <App />

          <Toaster />

        </TransactionProvider>

      </AuthProvider>

    </ThemeProvider>
  </StrictMode>
);