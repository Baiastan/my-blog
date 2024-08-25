"use client";

import React from "react";

import NavigationItem from "./NavigationItem";

import styles from "./NavBar.module.scss";
import ThemeToggle from "../dark-light-mode/ThemeToggle";

const navLinks = [
  {
    to: "/",
    text: "Home",
    exact: true,
  },
  {
    to: "/frontend-blog",
    text: "Frontend blog",
  },
  {
    to: "https://www.linkedin.com/in/baiastan-zhuzupbekov",
    text: "Linkedin",
    external: true,
  },
];

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navBarContainer}>
        {navLinks.map((navLink, index) => (
          <NavigationItem
            key={`${index}-${navLink.text}`}
            text={navLink.text}
            external={navLink.external}
            to={navLink.to}
            className={styles.navItem}
            active={styles.active}
            inactive={styles.inactive}
          />
        ))}
        <ThemeToggle />
      </ul>
    </nav>
  );
};

export default Navbar;
