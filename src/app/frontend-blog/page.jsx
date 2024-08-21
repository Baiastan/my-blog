import React from "react";
import Block from "../components/common/block/Block";
import PostLinks from "./components/post-links/PostLinks";
import { fetchPostLinks } from "./fetch-api/fetch-post-utils";

const FrontendBlogPage = async () => {
  const links = await fetchPostLinks();

  return (
    <Block el="article">
      <PostLinks links={links} />
    </Block>
  );
};

export default FrontendBlogPage;
