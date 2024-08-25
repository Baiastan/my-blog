import React from "react";
import { fetchPostDetails } from "../../fetch-api/fetch-post-utils";
import PostHeader from "@/app/components/common/header/PostHeader";

const HigherOrderFunctions = async () => {
  const post = await fetchPostDetails("higher-order-functions");
  return (
    <>
      <PostHeader>{post.title}</PostHeader>
    </>
  );
};

export default HigherOrderFunctions;
