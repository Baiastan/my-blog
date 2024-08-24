"use client";
import React, { useEffect } from "react";

import { HiMoon, HiSun } from "react-icons/hi";

import styles from "./ThemeToggle.module.scss";

const ThemeToggle = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={styles.toggleContainer}>
      <input onChange={toggleTheme} type="checkbox" className={styles.checkbox} id="checkbox" />
      <label for="checkbox" className={styles.checkboxLabel}>
        <HiMoon className={styles.hiMoon} />
        <HiSun className={styles.hiSun} />
        <span className={styles.ball}></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
