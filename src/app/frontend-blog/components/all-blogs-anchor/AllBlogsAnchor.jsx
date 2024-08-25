import PostCard from "@/app/components/common/post-card/PostCard";
import Link from "next/link";
import React from "react";

import styles from "./AllBlogsAnchor.module.scss";

const AllBlogsAnchor = ({ className, inline = false, text = "All Blogs" }) => {
  return inline ? (
    <Link href="/frontend-blog" className={`link-to-resources ${className}`}>
      {text}
    </Link>
  ) : (
    <PostCard className={`${className} ${styles.allBlogsAnchorContainer}`}>
      <Link href="/frontend-blog" className="link-to-resources">
        {text}
      </Link>
      <a href="#post-header">Go To Top</a>
    </PostCard>
  );
};

export default AllBlogsAnchor;
