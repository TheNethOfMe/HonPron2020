import React, { Fragment } from "react";
import PropTypes from "prop-types";

const SeriesListItem = ({ singleSeries }) => {
  let banner;
  if (singleSeries.image) {
    banner = require(`../../../img/entry-img/${singleSeries.image}`);
  }
  return (
    <Fragment>
      {banner && <img src={banner} alt={singleSeries.imageAlt} />}
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
    </Fragment>
  );
};

SeriesListItem.propTypes = {
  singleSeries: PropTypes.object.isRequired
};

export default SeriesListItem;
