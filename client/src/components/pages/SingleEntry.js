import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import EntryContext from "../../context/entries/entryContext";
import CommentState from "../../context/comments/commentState";

import SinglePodcast from "../entries/single-entry/SinglePodcast";
import SingleVideo from "../entries/single-entry/SingleVideo";
import SingleBlog from "../entries/single-entry/SingleBlog";
import CommentSection from "../entries/single-entry/CommentSection";
import Loading from "../base/Loading";

const SingleEntry = ({ match }) => {
  const entryContext = useContext(EntryContext);
  const { single, comments, getOneEntry } = entryContext;
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
  return (
    <div className="single-entry">
      {!Object.keys(single).length ? (
        <Loading />
      ) : (
        <Fragment>
          {display}
          <CommentState>
            <CommentSection
              comments={comments}
              entryId={single._id}
              seriesId={single.series.id}
            />
          </CommentState>
        </Fragment>
      )}
    </div>
  );
};

SingleEntry.propTypes = {
  match: PropTypes.object.isRequired
};

export default SingleEntry;
