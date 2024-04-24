import React, { useEffect, useState, useMemo, useContext } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Product } from "../../types";
import { Breadcrumbs } from "../../components/BreadCrumbs";
import { ProductsContext } from "../../context/ProductsContext";
import { getProducts } from "../../services/products";
import { Loader } from "../../components/Loader";
import styles from "./PhonesPage.module.scss";
import { PaginatedItems } from "../../components/PaginatedItems/PaginatedItems";
import { Footer } from "../../components/Footer";

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isPerPageActive, setIsPerPageActive] = useState(false);
  const { goods, setGoods } = useContext(ProductsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort") || "age";
  const perPage = searchParams.get("perPage");
  const currPage = searchParams.get("page") || "1";
  const { pathname, search } = useLocation();

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

  const phonesAmount = useMemo(() => (phones ? phones.length : 0), [phones]);
  const sortByOptions = useMemo(
    () => [
      { name: "Newest", value: "age" },
      { name: "Alphabetically", value: "title" },
      { name: "Cheapest", value: "price" },
    ],
    []
  );
  const itemsPerPageOptions = useMemo(() => ["4", "8", "16", "All"], []);

  const onSortBySelected = (value: string) => {
    setIsSortActive(false);
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  };

  const onPerPageSelected = (value: string) => {
    setIsPerPageActive(false);
    const params = new URLSearchParams(searchParams);
    if (value === "All") {
      params.delete("perPage");
      params.delete('page');
      setSearchParams(params);
      return;
    }
    params.set("perPage", `${value}`);
    setSearchParams(params);
  };

  const sortedPhones = useMemo(() => {
    switch (sortBy) {
      case "age":
        return [...phones.sort((a, b) => b.year - a.year)];
      case "title":
        return [...phones].sort((a, b) => b.name.localeCompare(a.name));
      case "price":
        return [...phones].sort((a, b) => a.price - b.price);
      default:
        return [...phones];
    }
  }, [sortBy, phones]);

  return (
    <>
      <div className={styles.container}>
        <Breadcrumbs />
        <h1 className={styles.pageHeading}>Mobile phones</h1>
        <p className={styles.amount}>{phonesAmount} models</p>
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
                        onSortBySelected(option.value);
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
                  {perPage ? perPage : 'All'}
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
                        onPerPageSelected(option);
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
            // sortedPhones.map((phone) => (
            //   <div className={styles.phone} key={phone.id}>
            //     <ProductCard product={phone} />
            //   </div>
            // ))
            <PaginatedItems
              itemsPerPage={perPage ? +perPage : phonesAmount}
              items={sortedPhones}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
