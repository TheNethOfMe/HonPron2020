import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SeriesListItem from "./SeriesListItem";

const SeriesList = ({ series }) => {
  return (
    <Fragment>
      {series.map(seriesItem => (
        <SeriesListItem key={seriesItem._id} singleSeries={seriesItem} />
      ))}
    </Fragment>
  );
};

SeriesList.propTypes = {
  series: PropTypes.array.isRequired
};

export default SeriesList;
