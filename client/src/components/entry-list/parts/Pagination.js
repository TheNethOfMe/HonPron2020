import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ page, pagination, handlePagination }) => {
  let leftArrow, rightArrow;
  if (pagination.prev) {
    leftArrow = (
      <span
        className="pagination_arrow active"
        onClick={() => handlePagination(pagination.prev.page)}
      >
        &larr;
      </span>
    );
  } else {
    leftArrow = <span className="pagination_arrow greyed">&larr;</span>;
  }

  if (pagination.next) {
    rightArrow = (
      <span
        className="pagination_arrow active"
        onClick={() => handlePagination(pagination.next.page)}
      >
        &rarr;
      </span>
    );
  } else {
    rightArrow = <span className="pagination_arrow greyed">&rarr;</span>;
  }
  return (
    <div className="pagination">
      {leftArrow}
      <span>Page {page}</span>
      {rightArrow}
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pagination: PropTypes.object.isRequired,
  queryParams: PropTypes.object
};

export default Pagination;
