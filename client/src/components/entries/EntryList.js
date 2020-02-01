import React, { Fragment } from "react";
import PropTypes from "prop-types";

import PodcastListItem from "./PodcastListItem";
import VideoListItem from "./VideoListItem";
import BlogListItem from "./BlogListItem";

const EntryList = ({ entries }) => {
  return (
    <Fragment>
      {entries.map(entry => (
        <div key={entry._id} className="entry-list-item">
          {entry.entryType === "podcast" ? (
            <PodcastListItem entry={entry} />
          ) : entry.entryType === "video" ? (
            <VideoListItem entry={entry} />
          ) : (
            <BlogListItem entry={entry} />
          )}
        </div>
      ))}
    </Fragment>
  );
};

EntryList.propTypes = {
  entries: PropTypes.array.isRequired
};

export default EntryList;
