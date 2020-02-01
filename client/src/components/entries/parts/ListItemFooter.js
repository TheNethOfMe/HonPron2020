import React from "react";
import PropTypes from "prop-types";

const ListItemFooter = ({ commentCount, duration }) => {
  return (
    <div className="entry-list-item_footer">
      <span>
        <i className="far fa-comments" />
        <p>{commentCount}</p>
      </span>
      {!!duration && (
        <span>
          <i className="far fa-clock" />
          <p>{duration}</p>
        </span>
      )}
    </div>
  );
};

ListItemFooter.propTypes = {
  commmentCount: PropTypes.number,
  duration: PropTypes.string
};

ListItemFooter.default = {
  commentCount: 0,
  duration: null
};

export default ListItemFooter;
