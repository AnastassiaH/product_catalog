import React, { useContext } from "react";
import styles from "./FavoriteButton.module.scss";
import { FavoritesContext } from "../../context/FavoritesContext";
import { ProductsContext } from "../../context/ProductsContext";
import { Product, ProductDetailed } from "../../types";

type Props = {
  product: Product | ProductDetailed;
};

export const FavoriteButton: React.FC<Props> = ({ product }) => {
  const { goods } = useContext(ProductsContext);
  const { favoriteItems, setFavoriteItems } = useContext(FavoritesContext);

  const newItem =
    "itemId" in product
      ? product
      : goods?.filter((good) => good.itemId === product.id)[0];

  const addToFavorites = () => {
    if (newItem) {
      setFavoriteItems(favoriteItems ? [...favoriteItems, newItem] : [newItem]);
    }
  };

  const removeFromFavorites = () => {
    if (favoriteItems && newItem) {
      setFavoriteItems(
        favoriteItems.filter((item) => item.itemId !== newItem.itemId)
      );
    }
  };

  return (
    <>
      {favoriteItems?.some((item) => item.itemId === newItem?.itemId) ? (
        <button
        className={styles.favorited}
        onClick={removeFromFavorites}
      ></button>
      ) : (
        <button
          className={styles.favoriteButton}
          onClick={addToFavorites}
        ></button>
      )}
    </>
  );
};
