import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AuthProvider } from "./context/auth";
import { ModeProvider } from "./context/mode";
import { ModalProvider } from "./context/modal";
const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModeProvider>
          <ModalProvider>
            <HashRouter>
              <Route path="/*" element={<App />} />
            </HashRouter>
          </ModalProvider>
        </ModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
