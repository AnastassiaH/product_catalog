import React, { useState, useCallback } from "react";
import { Product } from "../types";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  favoriteItems: Product[] | null;
  updateFavoriteItems: (values: Product[]) => void;
};

export const FavoritesContext = React.createContext<ContextType>({
  favoriteItems: null,
  updateFavoriteItems: () => {},
});

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState<Product[] | null>(null);

  const updateFavoriteItems = useCallback((data: Product[]) => {
    if (data) {
      setFavoriteItems(data);
    }
  }, []);

  return (
    <FavoritesContext.Provider value={{ favoriteItems, updateFavoriteItems }}>
      {children}
    </FavoritesContext.Provider>
  );
};
