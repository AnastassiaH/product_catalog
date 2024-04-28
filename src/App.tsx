import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartContext } from "./context/CartContext";

const App: React.FC = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const cartItemsInStorage = localStorage.getItem("cartItems");
    if (cartItemsInStorage) {
      setCartItems(JSON.parse(cartItemsInStorage));
    }
  }, []);

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

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
