import React from "react";
import PropTypes from "prop-types";

const HTMLParser = ({ children }) => {
  return <div dangerouslySetInnerHTML={{ __html: children }} />;
};

HTMLParser.propTypes = {
  children: PropTypes.string.isRequired,
};

export default HTMLParser;
