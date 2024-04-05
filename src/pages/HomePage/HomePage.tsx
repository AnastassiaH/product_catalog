import React from "react";
import { PicturesSlider } from "../../components/PicturesSlider";
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
    </div>
  );
};
