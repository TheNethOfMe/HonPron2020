import React from "react";
import PropTypes from "prop-types";

import ListItemHead from "../entry-parts/ListItemHead";
import ListItemImg from "../entry-parts/ListItemImg";
import BlogChunk from "../entry-parts/BlogChunk";

const SingleBlog = ({ blog }) => {
  const imgSrc = require(`../../../img/entry-img/${blog.image}`);
  const jsDate = new Date(blog.dateAdded);
  const displayDate = `${jsDate.getMonth() +
    1}/${jsDate.getDate()}/${jsDate.getFullYear()}`;
  return (
    <div className="single-blog">
      <ListItemHead series={blog.series.seriesName} icon="fas fa-pencil-alt" />
      <h2>{blog.title}</h2>
      <p className="entry-list-item_date">
        by {blog.author} on {displayDate}
      </p>
      <p className="entry-list-item_desc">{blog.description}</p>
      <ListItemImg src={imgSrc} alt={blog.imageAlt} />
      <div className="blog-block">
        {blog.blog.map((chunk, i) => {
          return (
            <BlogChunk
              key={`${blog._id}-${i}`}
              type={chunk.split("@")[0]}
              content={chunk.split("@")[1]}
            />
          );
        })}
      </div>
    </div>
  );
};

SingleBlog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default SingleBlog;
