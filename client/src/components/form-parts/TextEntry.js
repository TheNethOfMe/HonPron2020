import React from "react";
import PropTypes from "prop-types";

const TextEntry = ({
  name,
  id = `hp ${name}`,
  placeholder,
  value,
  label,
  type,
  info,
  onChange,
  disabled = false
}) => {
  return (
    <div className="hp-input">
      <label className="hp-input_label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className="hp-input_field"
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-describedby={!!info ? `${id}-desc` : ""}
      />
      {info && (
        <p className="hp-input_info" id={`${id}-desc`}>
          {info}
        </p>
      )}
    </div>
  );
};

TextEntry.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default TextEntry;
