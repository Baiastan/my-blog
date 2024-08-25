import React from "react";

import AllBlogsAnchor from "../components/all-blogs-anchor/AllBlogsAnchor";

const PostLayout = ({ children }) => {
  return (
    <>
      {children}
      <AllBlogsAnchor />
    </>
  );
};

export default PostLayout;
