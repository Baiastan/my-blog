import React from "react";
import styles from "./AnchorLink.module.scss";

const AnchorLink = ({ href, text }) => {
  return (
    <div className={styles.anchorLinkContainer}>
      <span className={styles.dot}></span>
      <a className={styles.anchorLink} href={href}>
        {text}
      </a>
    </div>
  );
};

export default AnchorLink;
