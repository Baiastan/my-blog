import React from "react";

const Header = ({ children, color = "", level = 2, size = "l", border = false, id }) => {
  const HeadingTag = `h${level}`; // Dynamically set the heading tag based on the level prop

  const colors = {
    red: "#ef4444",
    white: "white",
    green: "#7ec699",
  };

  const sizes = {
    s: "0.875rem",
    m: "1rem",
    l: "1.25rem",
    xl: "1.75rem",
  };

  return (
    <HeadingTag
      id={id}
      style={{ color: colors[color], fontSize: sizes[size] }}
      className={`generic-class ${border && "border-wrapper"}`}
    >
      {children}
    </HeadingTag>
  );
};

export default Header;
