import React from "react";

const BlogChunk = ({ type, content }) => {
  return <div className={`single-blog_${type}`}>{content}</div>;
};

export default BlogChunk;
