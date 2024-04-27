import React, { useContext, useMemo } from "react";
import styles from "./CartPage.module.scss";
import { BackButton } from "../../components/BackButton";
import { CartContext } from "../../context/CartContext";
import { CartItemCard } from "../../components/CartItemCard";
import { Footer } from "../../components/Footer";

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(CartContext);

  const totalSum = useMemo(() => {
    return cartItems?.reduce(
      (acc, item) => acc + item.amount * (item.product?.price || 0),
      0
    );
  }, [cartItems]);
  return (
    <>
      <div className={styles.container}>
        <BackButton />
        <h1 className={styles.title}>Cart</h1>
        {cartItems ? (
          <div className={styles.cartContent}>
            <div className={styles.itemsContainer}>
              {cartItems &&
                cartItems.map((item) => (
                  <CartItemCard key={item.product?.id} product={item} />
                ))}
            </div>
            <div className={styles.totalContainer}>
              <div className={styles.top}>
                <p className={styles.totalSum}>${totalSum}</p>
                <p className={styles.totalItems}>
                  Total for {cartItems?.length}{" "}
                  {cartItems?.length || 0 > 1 ? "items" : "item"}
                </p>
              </div>
              <button className={styles.checkoutButton}>Checkout</button>
            </div>
          </div>
        ) : (
          <p className={styles.emptyMessage}>Your cart is empty</p>
        )}
      </div>
    </>
  );
};
