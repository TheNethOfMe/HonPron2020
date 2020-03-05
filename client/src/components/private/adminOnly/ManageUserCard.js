import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import UserContext from "../../../context/users/userContext";

const ManageUserCard = ({ user }) => {
  const userContext = useContext(UserContext);
  const { updateUserStatus, deleteUser } = userContext;
  const [isWarned, setWarning] = useState(false);
  const [status, setStatus] = useState(user.status);
  const { name, email } = user;
  const deleteClick = () => {
    deleteUser(user._id);
  };
  const onSubmit = e => {
    e.preventDefault();
    updateUserStatus(user._id, { status });
  };
  return (
    <div className="admin-manage_menucard">
      {!isWarned ? (
        <form className="admin-manage_ordered" onSubmit={onSubmit}>
          <div className="admin-manage_ordered-btns">
            <button className="hp-btn admin-manage_update-btn">Update</button>
            <button
              type="button"
              onClick={() => setWarning(!isWarned)}
              className="hp-btn admin-manage_delete-btn"
            >
              Delete
            </button>
          </div>
          <div className="admin-manage_ordered-fields">
            <h2>{name}</h2>
            <h3>Email: {email}</h3>
            <div>
              <label className="hp-input_label" htmlFor="status">
                Set Status
              </label>
              <select
                className="hp-input"
                name="status"
                id="status"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="user">Good Standing</option>
                <option value="premium">Premium</option>
                <option value="blacklisted">Blacklist</option>
                <option value="blocked">Banned</option>
              </select>
            </div>
          </div>
        </form>
      ) : (
        <div className="admin-manage_ordered">
          <div className="part-1">
            <button
              type="button"
              onClick={() => setWarning(!isWarned)}
              className="hp-btn admin-manage_update-btn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => deleteClick()}
              className="hp-btn admin-manage_delete-btn"
            >
              Delete
            </button>
          </div>
          <p className="hp-btn admin-manage_warning-text">
            Are you absoultely sure you want to delete a user? You probably
            shouldn't do this unless the user requested it.
          </p>
        </div>
      )}
    </div>
  );
};

ManageUserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default ManageUserCard;
