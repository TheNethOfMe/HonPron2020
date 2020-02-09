import React, { Fragment } from "react";
import PropTypes from "prop-types";

import ListItemHead from "../entry-parts/ListItemHead";
import ListItemDetails from "../entry-parts/ListItemDetails";

const SingleVideo = ({ video }) => {
  return (
    <Fragment>
      <ListItemHead series={video.series.seriesName} icon="fas fa-video" />
      <div className="single-entry-content">
        <iframe
          width="560"
          height="349"
          src={`https://www.youtube.com/embed/${video.urlId}`}
          frameBorder="0"
          title={video.title}
          allowFullScreen
        />
      </div>
      <ListItemDetails
        date={video.dateAdded}
        title={video.title}
        description={video.description}
      />
    </Fragment>
  );
};

SingleVideo.propTypes = {
  video: PropTypes.object.isRequired
};

export default SingleVideo;
