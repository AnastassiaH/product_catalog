import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartContext } from "./context/CartContext";
import { FavoritesContext } from "./context/FavoritesContext";

const App: React.FC = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { favoriteItems, setFavoriteItems } = useContext(FavoritesContext);

  useEffect(() => {
    const cartItemsInStorage = localStorage.getItem("cartItems");
    if (cartItemsInStorage) {
      setCartItems(JSON.parse(cartItemsInStorage));
    }

    const favoriteItemsInStorage = localStorage.getItem("favoriteItems");
    if (favoriteItemsInStorage) {
      setFavoriteItems(JSON.parse(favoriteItemsInStorage));
    }
  }, []);

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (favoriteItems) {
      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
