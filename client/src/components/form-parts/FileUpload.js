import React from "react";
import PropTypes from "prop-types";

const FileUpload = ({ name, label, info, accept, onChange }) => {
  return (
    <div>
      <div className="hp-input">
        <label className="hp-input_file" htmlFor={name}>
          {label}
          <input
            type="file"
            className="hp-input_label"
            name={name}
            id={name}
            accept={accept}
            onChange={onChange}
            aria-describedby={`hp-${name}`}
          />
          {info && (
            <p className="hp-input_info" id={`hp-${name}`}>
              {info}
            </p>
          )}
        </label>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default FileUpload;
