import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ListItemHead from "../entry-parts/ListItemHead";
import ListItemImg from "../entry-parts/ListItemImg";
import ListItemDetails from "../entry-parts/ListItemDetails";
import ListItemFooter from "../entry-parts/ListItemFooter";

const VideoListItem = ({ entry }) => {
  const srcImg = require("../../../img/test.jpg");
  const imgAlt = "This is just a test image.";
  return (
    <Fragment>
      <ListItemHead series={entry.series.series} icon="fas fa-video" />
      <ListItemImg src={srcImg} alt={imgAlt} />
      <ListItemDetails
        date={entry.dateAdded}
        title={entry.title}
        description={entry.description}
      />
      <ListItemFooter duration={entry.duration} />
    </Fragment>
  );
};

VideoListItem.propTypes = {
  entry: PropTypes.object.isRequired
};

export default VideoListItem;
