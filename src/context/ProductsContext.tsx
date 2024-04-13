import React, { useState, useMemo } from "react";
import { Product } from "../types";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  goods: Product[] | null;
  setGoods: React.Dispatch<React.SetStateAction<Product[] | null>>;
};

export const ProductsContext = React.createContext<ContextType>({
    goods: null,
    setGoods: () => {}
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [goods, setGoods] = useState<Product[] | null>(null);

  const value = useMemo(
    () => ({
      goods,
      setGoods,
    }),
    [goods]
  );
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
