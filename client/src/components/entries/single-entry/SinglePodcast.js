import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ListItemHead from "../entry-parts/ListItemHead";
import ListItemImg from "../entry-parts/ListItemImg";
import ListItemDetails from "../entry-parts/ListItemDetails";
import SnesListPodcast from "../entry-parts/SnesListPodcast";

const SinglePodcast = ({ podcast }) => {
  const srcImg = `https://lh3.googleusercontent.com/${podcast.imgURL}`;
  return (
    <Fragment>
      <ListItemHead series={podcast.series.seriesName} icon="fas fa-podcast" />
      <ListItemImg src={srcImg} alt={podcast.imageAlt} />
      <div className="single-entry-content">
        <iframe
          width="400px"
          height="102px"
          src={`https://anchor.fm/honest-piranha/embed/episodes/${podcast.urlId}`}
          frameBorder="0"
          title={podcast.title}
          scrolling="no"
        />
      </div>
      <ListItemDetails
        date={podcast.dateAdded}
        title={podcast.title}
        description={podcast.description}
      />
      {podcast.series.seriesName === "SNEScapades" && (
        <SnesListPodcast snesList={podcast.formattedList} />
      )}
    </Fragment>
  );
};

SinglePodcast.propTypes = {
  podcast: PropTypes.object.isRequired
};

export default SinglePodcast;
