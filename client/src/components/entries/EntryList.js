import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import PodcastListItem from "./list-item/PodcastListItem";
import VideoListItem from "./list-item/VideoListItem";
import BlogListItem from "./list-item/BlogListItem";

const EntryList = ({ entries }) => {
  return (
    <Fragment>
      {entries.map(entry => (
        <Link
          to={`/entry/${entry._id}`}
          key={entry._id}
          className="entry-list-item"
        >
          {entry.entryType === "podcast" ? (
            <PodcastListItem entry={entry} />
          ) : entry.entryType === "video" ? (
            <VideoListItem entry={entry} />
          ) : (
            <BlogListItem entry={entry} />
          )}
        </Link>
      ))}
    </Fragment>
  );
};

EntryList.propTypes = {
  entries: PropTypes.array.isRequired
};

export default EntryList;
