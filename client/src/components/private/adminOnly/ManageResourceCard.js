import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ManageResourceCard = ({ linkTo, title, type, handleDelete }) => {
  const [isWarned, setWarning] = useState(false);
  return (
    <div className={`admin-manage_card admin-manage_card-${type}`}>
      {!isWarned ? (
        <Fragment>
          <h3>{title}</h3>
          <div className="admin-manage_btn-dash">
            <Link to={linkTo} className="hp-btn admin-manage_update-btn">
              Update
            </Link>
            <button
              onClick={() => setWarning(!isWarned)}
              className="hp-btn admin-manage_delete-btn"
            >
              Delete
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className="admin-manage_warning-text">
            Are you absoultely sure you want to delete this? This action cannot
            be undone. Note that if you are deleting a series, all accociated
            entries will also be erased.
          </p>
          <div className="admin-manage_btn-dash">
            <button
              onClick={handleDelete}
              className="hp-btn admin-manage_delete-btn"
            >
              Delete
            </button>
            <button
              onClick={() => setWarning(!isWarned)}
              className="hp-btn admin-manage_update-btn"
            >
              Cancel
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

ManageResourceCard.propTypes = {
  linkTo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default ManageResourceCard;
