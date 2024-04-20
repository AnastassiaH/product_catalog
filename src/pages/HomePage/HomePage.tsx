import React, {
  useEffect,
  useContext,
  useMemo,
  useState,
  Suspense,
} from "react";
import { NavLink } from "react-router-dom";
import { PicturesSlider } from "../../components/PicturesSlider";
import styles from "./HomePage.module.scss";
import { ProductsContext } from "../../context/ProductsContext";
import { getProducts } from "../../services/products";
import { ProductsSlider } from "../../components/ProductsSlider";
import { Footer } from "../../components/Footer";

export const HomePage: React.FC = () => {
  const { goods, setGoods } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(false);
  const categoryPhones = `${process.env.PUBLIC_URL}/img/category-phones.png`;
  const categoryTablets = `${process.env.PUBLIC_URL}/img/category-tablets.png`;
  const categoryAccessories = `${process.env.PUBLIC_URL}/img/category-accessories.png`;

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setGoods)
      .finally(() => setIsLoading(false));
  }, []);

  const brandNewGoods = useMemo(
    () =>
      goods
        ? [...goods]
            .sort((a, b) => b.fullPrice - a.fullPrice)
            .map((good) => ({ ...good, fullPrice: 0 }))
        : [],
    [goods]
  );

  const hotPricesGoods = useMemo(
    () => (goods ? [...goods].sort((a, b) => b.price - a.price) : []),
    [goods]
  );

  const phonesAmount = useMemo(
    () =>
      goods ? goods.filter((good) => good.category === "phones").length : null,
    [goods]
  );

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
      </div>
      <div className={styles["brand-new-container"]}>
        <h2 className={styles["brand-new-title"]}>Brand new models</h2>
        <Suspense fallback={<>waiting...</>}>
          <ProductsSlider goods={brandNewGoods} isLoading={isLoading} />
        </Suspense>
      </div>
      <div className={styles["categories-container"]}>
        <h2 className={styles["categories-title"]}>Shop by category</h2>
        <div className={styles["categories-flex"]}>
          <NavLink className={styles.categoryLink} to="/phones">
            <div className={styles.category}>
              <img
                className={styles.categoryImage}
                src={categoryPhones}
                alt="phones"
              />
              <p className={styles["category-title"]}>Mobile phones</p>
              <p className={styles["category-amount"]}>{phonesAmount} models</p>
            </div>
          </NavLink>
          <NavLink className={styles.categoryLink} to="/tablets">
            <div className={styles.category}>
              <img
                className={styles.categoryImage}
                src={categoryTablets}
                alt="tablets"
              />
              <p className={styles["category-title"]}>Tablets</p>
              <p className={styles["category-amount"]}>{phonesAmount} models</p>
            </div>
          </NavLink>
          <NavLink className={styles.categoryLink} to="accessories">
            <div className={styles.category}>
              <img
                className={styles.categoryImage}
                src={categoryAccessories}
                alt="accessories"
              />
              <p className={styles["category-title"]}>Accessories</p>
              <p className={styles["category-amount"]}>{phonesAmount} models</p>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={styles.hotPricesContainer}>
        <h2 className={styles.hotPricesTitle}>Hot prices</h2>
        <ProductsSlider goods={hotPricesGoods} isLoading={isLoading} />
      </div>
      <Footer />
    </>
  );
};
