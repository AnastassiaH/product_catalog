import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/img/logo.svg`;
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={styles["header--mobile"]}>
        <div className={styles.top}>
          <Link className={styles.logoLink} to="/">
            <img src={logoUrl} alt="" />
          </Link>
          <button onClick={toggleMenu} className={styles.button}>
            <span className={`${styles.icon} ${styles["icon--menu"]}`}></span>
          </button>
        </div>
      </div>
      <aside className={`${styles.menu} ${isActive ? styles.active : ""}`}>
        <div className={styles.top}>
          <Link className={styles.logoLink} to="/" onClick={toggleMenu}>
            <img src={logoUrl} alt="" />
          </Link>
          <button onClick={toggleMenu} className={styles.button}>
            <span className={`${styles.icon} ${styles["icon--close"]}`}></span>
          </button>
        </div>
        <nav className={styles.nav}>
          <ul className={styles["nav__list"]}>
            <li className={styles["nav__item"]} onClick={toggleMenu}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles["nav__link"]} ${
                    isActive ? styles["nav__link--active"] : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles["nav__item"]} onClick={toggleMenu}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  `${styles["nav__link"]} ${
                    isActive ? styles["nav__link--active"] : ""
                  }`
                }
              >
                Phones
              </NavLink>
            </li>
            <li className={styles["nav__item"]} onClick={toggleMenu}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  `${styles["nav__link"]} ${
                    isActive ? styles["nav__link--active"] : ""
                  }`
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles["nav__item"]} onClick={toggleMenu}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  `${styles["nav__link"]} ${
                    isActive ? styles["nav__link--active"] : ""
                  }`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles["menu__icons"]}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles["nav__link"]} ${
                isActive ? styles["nav__link--active"] : ""
              }`
            }
          >
            <span className={`${styles.icon} ${styles["icon--heart"]}`}></span>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles["nav__link"]} ${
                isActive ? styles["nav__link--active"] : ""
              }`
            }
          >
            <span className={`${styles.icon} ${styles["icon--cart"]}`}></span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
