import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.jsx";
import ProductDetails from "./ProductDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/E54-Assignment-14">
      <Routes>

        <Route
          path="/"
          element={<App />}
        />

        <Route
          path="/products/:productId"
          element={<ProductDetails />}
        />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);