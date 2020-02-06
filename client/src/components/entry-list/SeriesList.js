import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SeriesListItem from "./SeriesListItem";

const SeriesList = ({ series }) => {
  return (
    <Fragment>
      {series.map(seriesItem => (
        <Link
          key={seriesItem.id}
          to={`/series/${seriesItem.slug}`}
          params={{ id: seriesItem._id }}
          className="entry-list-item"
        >
          <SeriesListItem key={seriesItem._id} singleSeries={seriesItem} />
        </Link>
      ))}
    </Fragment>
  );
};

SeriesList.propTypes = {
  series: PropTypes.array.isRequired
};

export default SeriesList;
