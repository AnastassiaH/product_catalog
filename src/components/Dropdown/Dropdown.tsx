import React, { useState } from "react";
import styles from "./Dropdown.module.scss";

type Props = {
  value: string;
  setValue: (sortBy: string) => void;
  options: any[];
};

export const Dropdown: React.FC<Props> = ({ value, setValue, options }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownTrigger} onClick={toggleDropdown} onBlur={toggleDropdown}>
        {value}
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
          {options.map((option) => (
            <li className={styles.option} onClick={() => {
              toggleDropdown();
              setValue(option);
            }}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
