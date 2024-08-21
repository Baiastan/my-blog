import React from "react";

import styles from "./Block.module.scss";

const Block = ({ children, el: Element = "div", className = "" }) => {
  return <Element className={`${styles.block} ${className}`}>{children}</Element>;
};

export default Block;
