import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ListItemHead from "../entry-parts/ListItemHead";
import ListItemImg from "../entry-parts/ListItemImg";
import ListItemDetails from "../entry-parts/ListItemDetails";
import ListItemFooter from "../entry-parts/ListItemFooter";

const BlogListItem = ({ entry }) => {
  const srcImg = `/image/entry-img/$entry.image}`;
  return (
    <Fragment>
      <ListItemHead series={entry.series.series} icon="fas fa-pencil-alt" />
      <ListItemImg src={srcImg} alt={entry.imageAlt} />
      <ListItemDetails
        date={entry.dateAdded}
        title={entry.title}
        description={entry.description}
      />
      <ListItemFooter duration={entry.duration} />
    </Fragment>
  );
};

BlogListItem.propTypes = {
  entry: PropTypes.object.isRequired
};

export default BlogListItem;
