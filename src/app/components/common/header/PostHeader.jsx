import React from "react";

const PostHeader = ({ children, color = "", id = "post-header" }) => {
  const colors = {
    red: "#ef4444",
    white: "white",
    green: "#7ec699",
  };

  return (
    <h1 id={id} style={{ color: colors[color], fontSize: "1.75rem" }} className={`generic-class border-wrapper`}>
      {children}
    </h1>
  );
};

export default PostHeader;
