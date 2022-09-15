import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AuthProvider } from "./context/auth";
import { ModeProvider } from "./context/mode";
import { ModalProvider } from "./context/modal";
import { MODAL_ROOT } from "./constant/modal";
import { LoadingProvider } from "./context/loading";
const root = ReactDOM.createRoot(document.getElementById("root"));
export const modalRoot = ReactDOM.createRoot(
  document.getElementById(MODAL_ROOT)
);
export const loaderRoot = ReactDOM.createRoot(
  document.getElementById("loader")
);
if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <AuthProvider>
          <ModeProvider>
            <LoadingProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </LoadingProvider>
          </ModeProvider>
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
