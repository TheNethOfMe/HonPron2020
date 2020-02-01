import React from "react";
import PropTypes from "prop-types";

const ListItemHead = ({ series, icon }) => {
  return (
    <div className="entry-list-item_head">
      <h3>{series}</h3>
      <i className={icon}></i>
    </div>
  );
};

ListItemHead.propTypes = {
  series: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default ListItemHead;
