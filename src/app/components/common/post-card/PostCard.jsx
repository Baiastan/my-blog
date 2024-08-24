import React from "react";

import styles from "./PostCard.module.scss";

const PostCard = ({ children, el: Element = "section", align = "left", className }) => {
  return (
    <Element style={{ alignItems: align }} className={`${styles.postCard} ${className}`}>
      {children}
    </Element>
  );
};

export default PostCard;
