import React, { useEffect, useState, useMemo } from "react";
import styles from "./PhonesPage.module.scss";
import { getPhones } from "../../services/phones";
import { Phone, SortByOptions } from "../../types";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Breadcrumbs } from "../../components/BreadCrumbs";

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [itemsOnPage, setItemsOnPage] = useState<string>('16');

  useEffect(() => {
    setIsLoading(true);
    getPhones()
      .then(setPhones)
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  const amount = useMemo(() => (phones ? phones.length : null), [phones]);
  const sortByOptions = useMemo(
    () => ["Newest", "Alphabetically", "Cheapest"],
    []
  );
  const itemsOnPageOptions = useMemo(() => ['4', '8', '16', "All"], []);

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.pageHeading}>Mobile phones</h1>
      <p className={styles.amount}>{amount} models</p>
      <div className={styles.dropdowns}>
        <div className={styles.sortByContainer}>
          <Dropdown
            value={sortBy}
            setValue={setSortBy}
            options={sortByOptions}
          />
        </div>
        <div className={styles.itemsOnPageContainer}>
        <Dropdown
            value={itemsOnPage}
            setValue={setItemsOnPage}
            options={itemsOnPageOptions}
          />
        </div>
      </div>
    </div>
  );
};
