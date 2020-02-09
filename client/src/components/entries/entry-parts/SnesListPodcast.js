import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import SnesList from "./SnesList";

const SnesListPodcast = ({ snesList }) => {
  const [isListVisable, toggleList] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => toggleList(!isListVisable)}
        className="single-entry-list-btn"
      >
        {isListVisable ? "Hide List" : "Show List"}
      </button>
      {isListVisable && <SnesList list={snesList} />}
    </Fragment>
  );
};

SnesListPodcast.propTypes = {
  snesList: PropTypes.array.isRequired
};

export default SnesListPodcast;
