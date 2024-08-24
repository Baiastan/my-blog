import PostCard from "@/app/components/common/post-card/PostCard";
import Link from "next/link";
import React from "react";

const AllBlogsAnchor = ({ className, inline = false, text = "All Blogs" }) => {
  return inline ? (
    <Link href="/frontend-blog" className={`link-to-resources ${className}`}>
      {text}
    </Link>
  ) : (
    <PostCard className={className}>
      <Link href="/frontend-blog" className="link-to-resources">
        {text}
      </Link>
    </PostCard>
  );
};

export default AllBlogsAnchor;
