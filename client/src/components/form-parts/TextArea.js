import React from "react";
import PropTypes from "prop-types";

const TextArea = ({
  name,
  placeholder,
  value,
  label,
  info,
  onChange,
  rows
}) => {
  return (
    <div className="hp-input">
      <label className="hp-input_label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="hp-input_field"
        rows={rows}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        aria-describedby={`hp-${name}`}
      />
      {info && (
        <p className="hp-input_info" id={`hp-${name}`}>
          {info}
        </p>
      )}
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number
};

export default TextArea;
