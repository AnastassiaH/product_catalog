import React, { useState, useMemo } from "react";
import { CartItem } from "../types";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  cartItems: CartItem[] | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[] | null>>;
};

export const CartContext = React.createContext<ContextType>({
  cartItems: null,
  setCartItems: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
    }),
    [cartItems]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
