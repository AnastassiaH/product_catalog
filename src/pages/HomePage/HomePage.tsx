import React from "react";
import { Banner } from "../../components/Banner";
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <Banner />
    </div>
  );
};
