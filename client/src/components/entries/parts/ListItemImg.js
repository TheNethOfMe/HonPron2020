import React from "react";
import PropTypes from "prop-types";

const ListItemImg = ({ src, alt }) => {
  return (
    <div className="entry-list-item_img">
      <img src={src} alt={alt} />
    </div>
  );
};

ListItemImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default ListItemImg;
