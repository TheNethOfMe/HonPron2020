import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ListItemHead from "../entry-parts/ListItemHead";
import ListItemImg from "../entry-parts/ListItemImg";
import ListItemDetails from "../entry-parts/ListItemDetails";
import ListItemFooter from "../entry-parts/ListItemFooter";

const PodcastListItem = ({ entry }) => {
  let srcImg, imgAlt;
  if (!!entry.imgURL) {
    srcImg = `https://lh3.googleusercontent.com/${entry.imgURL}`;
    imgAlt = entry.imageAlt;
  } else {
    srcImg = "/image/entry-img/test.jpg";
    imgAlt = "This is just a test image";
  }
  return (
    <Fragment>
      <ListItemHead series={entry.series.series} icon="fas fa-podcast" />
      <ListItemImg src={srcImg} alt={imgAlt} />
      <ListItemDetails
        date={entry.dateAdded}
        title={entry.title}
        description={entry.description.split("\n")[0]}
      />
      <ListItemFooter duration={entry.duration} />
    </Fragment>
  );
};

PodcastListItem.propTypes = {
  entry: PropTypes.object.isRequired
};

export default PodcastListItem;
