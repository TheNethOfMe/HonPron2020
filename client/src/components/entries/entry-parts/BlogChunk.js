import React from "react";
import PropTypes from "prop-types";

const BlogChunk = ({ type, content }) => {
  return <div className={`single-blog_${type}`}>{content}</div>;
};

BlogChunk.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default BlogChunk;
