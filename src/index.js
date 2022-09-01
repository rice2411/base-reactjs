import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AuthProvider } from "./context/auth";
import { ModeProvider } from "./context/mode";
const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
          <ModeProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ModeProvider>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
