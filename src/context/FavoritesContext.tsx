import React, { useState, useMemo } from "react";
import { Product } from "../types";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  favoriteItems: Product[] | null;
  setFavoriteItems: React.Dispatch<React.SetStateAction<Product[] | null>>;
};

export const FavoritesContext = React.createContext<ContextType>({
  favoriteItems: null,
  setFavoriteItems: () => {},
});

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState<Product[] | null>(null);

  const value = useMemo(
    () => ({
      favoriteItems,
      setFavoriteItems,
    }),
    [favoriteItems]
  );
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
