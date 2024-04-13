import React, { useEffect, useContext } from "react";
import { PicturesSlider } from "../../components/PicturesSlider";
import styles from "./HomePage.module.scss";
import { ProductsContext } from "../../context/ProductsContext";
import { getProducts } from "../../services/products";
import { ProductsSlider } from "../../components/ProductsSlider";

export const HomePage: React.FC = () => {
  const { goods, setGoods } = useContext(ProductsContext);

  useEffect(() => {
    getProducts().then(setGoods);
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </div>
      <ProductsSlider />
    </>
  );
};
