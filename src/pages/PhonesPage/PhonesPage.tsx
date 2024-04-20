import React, { useEffect, useState } from "react";
import styles from "./PhonesPage.module.scss";
import { getPhones } from "../../services/phones";
import { Phone, SortByOptions } from "../../types";
import { Dropdown } from "../../components/Dropdown/Dropdown";

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortByOptions>(SortByOptions.Newest);

  useEffect(() => {
    setIsLoading(true);
    getPhones()
      .then(setPhones)
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <Dropdown sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
};
