import React from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { tomorrow, okaidia, nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ lang = "javascript", children, style = "react" }) => {
  const styles = {
    tomorrow,
    okaidia,
    nightOwl,
  };

  return (
    <SyntaxHighlighter language={lang} style={tomorrow}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
