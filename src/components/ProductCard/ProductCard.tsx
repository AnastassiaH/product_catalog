import React from "react";
import styles from "./ProductCard.module.scss";
import { Phone, Product } from "../../types";

type Props = {
  product: Product | Phone;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const image = "image" in product ? product.image : product.images[0];
  const price = "price" in product ? product.price : product.priceDiscount;
  const fullPrice =
    "fullPrice" in product ? product.fullPrice : product.priceRegular;
  const titleHeight = "image" in product ? "63px" : "42px";

  return (
    <div className={styles.container}>
      <div className={styles["image-container"]}>
        <img src={image} alt="" />
      </div>
      <p className={styles.title} style={{ height: titleHeight }}>
        {product.name}
      </p>
      <div className={styles.prices}>
        <p className={styles.price}>${price}</p>
        <p className={styles["full-price"]}>
          {fullPrice === 0 || `$${fullPrice}`}
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
      <div className={styles.bottom}>
        <button className={styles.cart}>Add to cart</button>
        <button className={styles.favorite}></button>
      </div>
    </div>
  );
};
