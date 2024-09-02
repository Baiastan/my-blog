import Link from "next/link";
import React from "react";
import DateDisplay from "../../../components/common/date/DateDisplay";

import Header from "../../../components/common/header/Header";

import styles from "./PostLinks.module.scss";

const PostLinks = ({ links }) => {
  return (
    <ul className={styles.postLinks}>
      {links?.map((link) => (
        <li key={link.to}>
          <Link href={link?.to}>
            <div>
              <Header level={3}>{link?.title}</Header>
              {link?.details && <p>{link?.details}</p>}
            </div>
            <DateDisplay date={link?.datePublished} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostLinks;
