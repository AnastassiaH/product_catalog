import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { Product } from "../../types";

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {

  return (
    <div className={styles.container}>
      <Link to={`/${product.category}/${product.itemId}`} className={styles.productLink}>
        <div className={styles["image-container"]}>
          <img src={product.image} alt="" />
        </div>
        <p className={styles.title}>{product.name}</p>
      </Link>
      <div className={styles.prices}>
        <p className={styles.price}>${product.price}</p>
        <p className={styles["full-price"]}>
          {product.fullPrice === 0 || `$${product.fullPrice}`}
        </p>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.description}>
        <div>
          <p className={styles.name}>Screen</p>
          <p className={styles.value}>{product.screen}</p>
        </div>
        <div>
          <p className={styles.name}>Capacity</p>
          <p className={styles.value}>{product.capacity}</p>
        </div>
        <div>
          <p className={styles.name}>RAM</p>
          <p className={styles.value}>{product.ram}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.cart}>Add to cart</button>
        <button className={styles.favorite}></button>
      </div>
    </div>
  );
};
