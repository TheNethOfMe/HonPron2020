import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SeriesListItem = ({ singleSeries }) => {
  return (
    <Link
      to={`/series/${singleSeries.slug}`}
      params={{ id: singleSeries._id }}
      className="entry-list-item"
    >
      <h2>
        {singleSeries.seriesName} -{" "}
        <i
          className={
            singleSeries.seriesType === "blog"
              ? "fas fa-pencil-alt"
              : `fas fa-${singleSeries.seriesType}`
          }
        ></i>
      </h2>
      <p>{singleSeries.seriesDesc}</p>
    </Link>
  );
};

SeriesListItem.propTypes = {
  singleSeries: PropTypes.object.isRequired
};

export default SeriesListItem;
