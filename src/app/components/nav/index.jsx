"use client";

import React from "react";

import NavigationItem from "./NavigationItem";

import styles from "./NavBar.module.scss";

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
    to: "/biography",
    text: "Biography",
  },
];

const Navbar = () => {
  return (
    <nav>
      <ul className={styles.navBarContainer}>
        {navLinks.map((navLink, index) => (
          <NavigationItem
            key={`${index}-${navLink.text}`}
            text={navLink.text}
            to={navLink.to}
            className={styles.navItem}
            active={styles.active}
            inactive={styles.inactive}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
