import React, { useEffect, useState, useMemo, useContext } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Product } from "../../types";
import { Breadcrumbs } from "../../components/BreadCrumbs";
import { ProductCard } from "../../components/ProductCard";
import { ProductsContext } from "../../context/ProductsContext";
import { getProducts } from "../../services/products";
import { Loader } from "../../components/Loader";
import styles from "./PhonesPage.module.scss";

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isPerPageActive, setIsPerPageActive] = useState(false);
  const [itemsOnPage, setItemsOnPage] = useState<string>("All");
  const { goods, setGoods } = useContext(ProductsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort") || "age";
  const perPage = searchParams.get('perPage') || 'All';
  const { search } = useLocation();

  useEffect(() => {
    if (!goods) {
      setIsLoading(true);
      getProducts()
        .then(setGoods)
        .catch()
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (goods) {
      setPhones(goods.filter((good) => good.category === "phones"));
    }
  }, [goods]);

  const amount = useMemo(() => (phones ? phones.length : null), [phones]);
  const sortByOptions = useMemo(
    () => [
      { name: "Newest", value: "age" },
      { name: "Alphabetically", value: "title" },
      { name: "Cheapest", value: "price" },
    ],
    []
  );
  const itemsPerPageOptions = useMemo(() => ["4", "8", "16", "All"], []);

  const sortedPhones = useMemo(() => {
    switch (sortBy) {
      case "age":
        return [...phones.sort((a, b) => b.year - a.year)];
      case "title":
        return [...phones].sort((a, b) => b.name.localeCompare(a.name));
      case "price":
        return [...phones].sort((a, b) => b.price - a.price);
      default:
        return [...phones];
    }
  }, [sortBy, phones]);

  return (
    <div className={styles.container}>
      {search}
      <Breadcrumbs />
      <h1 className={styles.pageHeading}>Mobile phones</h1>
      <p className={styles.amount}>{amount} models</p>
      <div className={styles.dropdowns}>
        <div className={styles.sortByContainer}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => {
                setIsSortActive(!isSortActive);
              }}
              onBlur={() => setIsSortActive(false)}
            >
              {
                sortByOptions.filter((option) => option.value === sortBy)[0]
                  .name
              }
              <span
                className={`${styles.icon} ${
                  isSortActive ? styles.arrowUp : styles.arrowDown
                }`}
              ></span>
            </button>
            <div
              className={`${styles.dropdownContent} ${
                isSortActive ? styles.active : ""
              }`}
            >
              <ul className={styles.content}>
                {sortByOptions.map((option) => (
                  <li
                    className={styles.option}
                    key={option.name}
                    onClick={() => {
                      setIsSortActive(false);
                      const params = new URLSearchParams(searchParams);
                      params.set("sort", `${option.value}`);
                      setSearchParams(params);
                    }}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.itemsOnPageContainer}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => {
                setIsPerPageActive(!isPerPageActive);
              }}
              onBlur={() => setIsPerPageActive(false)}
            >
              {itemsPerPageOptions.filter((option) => option === perPage)}
              <span
                className={`${styles.icon} ${
                  isPerPageActive ? styles.arrowUp : styles.arrowDown
                }`}
              ></span>
            </button>

            <div
              className={`${styles.dropdownContent} ${
                isPerPageActive ? styles.active : ""
              }`}
            >
              <ul className={styles.content}>
                {itemsPerPageOptions.map((option) => (
                  <li
                    className={styles.option}
                    key={option}
                    onClick={() => {
                      setIsPerPageActive(false);
                      const params = new URLSearchParams(searchParams);
                      params.set("perPage", `${option}`);
                      setSearchParams(params);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.phonesList}>
        {isLoading ? (
          <Loader />
        ) : (
          sortedPhones.map((phone) => (
            <div className={styles.phone} key={phone.id}>
              <ProductCard product={phone} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
