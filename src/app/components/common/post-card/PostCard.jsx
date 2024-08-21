import React from "react";

import styles from "./PostCard.module.scss";

const PostCard = ({ children, el: Element = "section" }) => {
  return <Element className={styles.postCard}>{children}</Element>;
};

export default PostCard;
