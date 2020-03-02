import React from "react";
import PropTypes from "prop-types";

const SelectType = ({ name, type, onChange }) => {
  return (
    <div className="hp-input_checkbox-list">
      <div className="hp-input_checkbox-group">
        <input
          className="hp-input_checkbox"
          type="radio"
          name={name}
          id="podcast-checkbox"
          value="podcast"
          checked={type === "podcast"}
          onChange={onChange}
        />
        <label className="hp-input_label_checkbox" htmlFor="podcast-checkbox">
          Podcast
        </label>
      </div>
      <div className="hp-input_checkbox-group">
        <input
          className="hp-input_checkbox"
          type="radio"
          name={name}
          id="video-checkbox"
          value="video"
          checked={type === "video"}
          onChange={onChange}
        />
        <label className="hp-input_label_checkbox" htmlFor="video-checkbox">
          Video
        </label>
      </div>
      <div className="hp-input_checkbox-group">
        <input
          className="hp-input_checkbox"
          type="radio"
          name={name}
          id="blog-checkbox"
          value="blog"
          checked={type === "blog"}
          onChange={onChange}
        />
        <label className="hp-input_label_checkbox" htmlFor="blog-checkbox">
          Blog
        </label>
      </div>
    </div>
  );
};

SelectType.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SelectType;
