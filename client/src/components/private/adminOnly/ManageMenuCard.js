import React, { useState } from "react";
import PropTypes from "prop-types";

import TextEntry from "../../form-parts/TextEntry";

const ManageMenuCard = ({ item, handleDelete, handleSubmit, title }) => {
  const [isWarned, setWarning] = useState(false);
  const [menuFields, setField] = useState({
    displayText: item.displayText,
    menuType: item.menuType,
    url: item.url,
    order: item.order
  });
  const { displayText, menuType, url, order } = menuFields;
  const onChange = e => {
    setField({ ...menuFields, [e.target.name]: e.target.value });
  };
  const deleteClick = id => {
    if (id === "new") {
      setField({
        displayText: "",
        menuType: "",
        url: "",
        order: ""
      });
      setWarning(false);
    } else {
      handleDelete(id);
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(item._id, menuFields);
    if (title === "new") {
      setField({
        displayText: "",
        menuType: "",
        url: "",
        order: ""
      });
    }
  };
  return (
    <div className="admin-manage_menucard">
      <h3>{title}</h3>
      {!isWarned ? (
        <form className="admin-manage_ordered" onSubmit={onSubmit}>
          <div className="admin-manage_ordered-btns">
            <button className="hp-btn admin-manage_update-btn">
              {item._id === "new" ? "Create" : "Update"}
            </button>
            <button
              type="button"
              onClick={() => setWarning(!isWarned)}
              className="admin-manage_delete-btn"
            >
              Delete
            </button>
          </div>
          <div className="admin-manage_ordered-fields">
            <TextEntry
              name="displayText"
              id={item._id}
              type="text"
              placeholder="Display Text"
              value={displayText}
              label="Display Text"
              onChange={onChange}
            />
            <TextEntry
              name="url"
              id={item._id}
              type="text"
              placeholder="Url"
              value={url}
              label="Url"
              onChange={onChange}
            />
          </div>
          <div className="admin-manage_smlfields">
            <TextEntry
              name="menuType"
              id={item._id}
              type="text"
              placeholder="Type"
              value={menuType}
              label="Type"
              onChange={onChange}
            />
            <TextEntry
              name="order"
              id={item._id}
              type="number"
              placeholder="Order"
              value={order}
              label="Order"
              onChange={onChange}
            />
          </div>
        </form>
      ) : (
        <div className="admin-manage_ordered">
          <div className="part-1">
            <button
              type="button"
              onClick={() => setWarning(!isWarned)}
              className="admin-manage_update-btn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => deleteClick(item._id)}
              className="hp-btn admin-manage_delete-btn"
            >
              Delete
            </button>
          </div>
          <p className="admin-manage_warning-text">
            Are you absoultely sure you want to delete this? This action cannot
            be undone.
          </p>
        </div>
      )}
    </div>
  );
};

ManageMenuCard.propTypes = {
  item: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  handleSubmit: PropTypes.func,
  title: PropTypes.string.isRequired
};

export default ManageMenuCard;
