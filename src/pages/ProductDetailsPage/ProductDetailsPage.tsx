import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getPhones } from "../../services/phones";
import { getTablets } from "../../services/tablets";
import { getAccessories } from "../../services/accessories";
import { ProductDetailed } from "../../types";
import { Loader } from "../../components/Loader";
import styles from "./ProductDetailsPage.module.scss";
import { Breadcrumbs } from "../../components/BreadCrumbs";

export const ProductDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductDetailed>();
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const { pathname } = useLocation();
  const category = pathname.split("/")[1];
  const itemId = pathname.split("/")[2];

  useEffect(() => {
    let getData;
    switch (category) {
      case "phones":
        getData = getPhones;
        break;
      case "tablets":
        getData = getTablets;
        break;
      case "accessories":
        getData = getAccessories;
        break;
      default:
        break;
    }

    if (getData) {
      setIsLoading(true);
      getData()
        .then((goods: ProductDetailed[]) => {
          const product = goods.filter((good) => good.id === itemId)[0];
          setProduct(product);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs details={product?.name} />
      <Link to={`/${category}`} className={styles.backLink}>
        <span className={styles.arrowBack}></span>Back
      </Link>
      <h1 className={styles.title}>{product?.name}</h1>
      <div className={styles.main}>
        <div className={styles.images}>
          <div className={styles.imageContainer}>
            <img src={product?.images[mainImageIndex]} alt="product" />
          </div>
          <div className={styles.imagePreview}>
            {product?.images
              .filter((_, i) => i !== mainImageIndex)
              .map((img, i) => (
                <div
                  className={styles.smallImage}
                  key={img}
                  onClick={() => setMainImageIndex(i)}
                >
                  <img src={img} alt="product" />
                </div>
              ))}
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.colorsBlock}>
            <div className={styles.colorsTop}>
              <p className={styles.detailsText}>Available colors</p>
              <p className={styles.idText}>ID: 802390</p>
            </div>
            <div className={styles.colorOptions}>
              <div className={styles.colorCircle}>
                <div
                  className={styles.insideCircle}
                  style={{ backgroundColor: `${product?.color}` }}
                ></div>
              </div>
              <div className={styles.colorCircle}>
                <div className={styles.insideCircle}></div>
              </div>
              <div className={styles.colorCircle}>
                <div className={styles.insideCircle}></div>
              </div>
              <div className={styles.colorCircle}>
                <div className={styles.insideCircle}></div>
              </div>
            </div>
          </div>
          <div className={styles.capacityBlock}>
            <p className={styles.detailsText}>Select capacity</p>
            <div className={styles.capacityOptions}>
              {product?.capacityAvailable.map((item) => (
                <p
                  className={
                    item === product.capacity
                      ? `${styles.capacityText} ${styles.capacityActive}`
                      : styles.capacityText
                  }
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.prices}>
            <p className={styles.price}>${product?.priceDiscount}</p>
            <p className={styles.fullPrice}>${product?.priceRegular}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.cart}>Add to cart</button>
            <button className={styles.favorite}></button>
          </div>
          <div className={styles.description}>
            <div>
              <p className={styles.detailsText}>Screen</p>
              <p className={styles.value}>{product?.screen}</p>
            </div>
            <div>
              <p className={styles.detailsText}>Capacity</p>
              <p className={styles.value}>{product?.capacity}</p>
            </div>
            <div>
              <p className={styles.detailsText}>RAM</p>
              <p className={styles.value}>{product?.ram}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
