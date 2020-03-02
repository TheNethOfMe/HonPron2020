import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import EntryContext from "../../context/entries/entryContext";

import SinglePodcast from "../entries/single-entry/SinglePodcast";
import SingleVideo from "../entries/single-entry/SingleVideo";
import SingleBlog from "../entries/single-entry/SingleBlog";

const SingleEntry = ({ match }) => {
  const entryContext = useContext(EntryContext);
  const { single, getOneEntry } = entryContext;
  useEffect(() => {
    getOneEntry(match.params.id);
    // eslint-disable-next-line
  }, []);
  let display;
  switch (single.entryType) {
    case "podcast":
      display = <SinglePodcast podcast={single} />;
      break;
    case "video":
      display = <SingleVideo video={single} />;
      break;
    case "blog":
      display = <SingleBlog blog={single} />;
      break;
    default:
      display = "No Entry to Display.";
  }
  return <div className="single-entry">{display}</div>;
};

SingleEntry.propTypes = {
  match: PropTypes.object.isRequired
};

export default SingleEntry;
