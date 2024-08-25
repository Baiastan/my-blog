import React from "react";
import styles from "./AnchorLink.module.scss";

const AnchorLink = ({ href, text, className }) => {
  return (
    <div className={`${styles.anchorLinkContainer} ${className}`}>
      <span className={styles.dot}></span>
      <a className={styles.anchorLink} href={href}>
        {text}
      </a>
    </div>
  );
};

export default AnchorLink;
