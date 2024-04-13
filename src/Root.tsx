import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage/HomePage";
import { AccessoriesPage } from "./pages/AccessoriesPage/AccessoriesPage";
import { TabletsPage } from "./pages/TabletsPage";
import { PhonesPage } from "./pages/PhonesPage";
import { CartPage } from "./pages/CartPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductsProvider } from "./context/ProductsContext";

export const Root = () => (
  <React.StrictMode>
    <ProductsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="accessories" element={<AccessoriesPage />} />
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ProductsProvider>
  </React.StrictMode>
);
