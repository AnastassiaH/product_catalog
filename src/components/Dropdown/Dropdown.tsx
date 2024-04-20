import React, { useState } from "react";
import styles from "./Dropdown.module.scss";
import { SortByOptions } from "../../types";

type Props = {
  sortBy: SortByOptions;
  setSortBy: (sortBy: SortByOptions) => void;
};

export const Dropdown: React.FC<Props> = ({ sortBy, setSortBy }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownTrigger} onClick={toggleDropdown}>
        {sortBy}
        <span
          className={`${styles.icon} ${
            isActive ? styles.arrowUp : styles.arrowDown
          }`}
        ></span>
      </button>

      <div
        className={`${styles.dropdownContent} ${isActive ? styles.active : ""}`}
      >
        <ul className={styles.content}>
          <li
            className={styles.option}
            onClick={() => {
              toggleDropdown();
              setSortBy(SortByOptions.Newest);
            }}
          >
            Newest
          </li>
          <li
            className={styles.option}
            onClick={() => {
              toggleDropdown();
              setSortBy(SortByOptions.Alphabetically);
            }}
          >
            Alphabetically
          </li>
          <li
            className={styles.option}
            onClick={() => {
              toggleDropdown();
              setSortBy(SortByOptions.Cheapest);
            }}
          >
            Cheapest
          </li>
        </ul>
      </div>
    </div>
  );
};
