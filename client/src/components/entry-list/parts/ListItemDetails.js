import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ListItemDetails = ({ date, title, description }) => {
  const jsDate = new Date(date);
  const displayDate = `${jsDate.getMonth() +
    1}/${jsDate.getDate()}/${jsDate.getFullYear() + 50}`;
  return (
    <Fragment>
      <p className="entry-list-item_date">{displayDate}</p>
      <h2>{title}</h2>
      <p className="entry-list-item_desc">{description}</p>
    </Fragment>
  );
};

ListItemDetails.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ListItemDetails;
