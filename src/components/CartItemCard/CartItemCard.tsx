import React from "react";
import styles from "./CartItemCard.module.scss";
import { CartItem } from "../../types";

type Props = {
  product: CartItem;
};

export const CartItemCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button className={styles.delete}></button>
        <img className={styles.cartItemImage} src={product.product?.image} alt="cartItemImage" />
        <p className={styles.title}>{product.product?.name}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.actions}>
            <button disabled={product.amount === 1} className={styles.decrease}></button>
            <p className={styles.amount}>{product.amount}</p>
            <button className={styles.increase}></button>
        </div>
        <p className={styles.price}>
          ${product.product?.price || 0 * product.amount}
        </p>
      </div>
    </div>
  );
};
