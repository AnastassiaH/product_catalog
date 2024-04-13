import React from "react";
import styles from "./ProductCard.module.scss";
import { Product } from "../../types";

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({  product }) => {
  return <div className={styles.container}>{`${product.name} - ${product.fullPrice}`}</div>;
};
