import React from "react";
import PropTypes from "prop-types";

const NumberEntry = ({
  name,
  id = `hp ${name}`,
  placeholder,
  value,
  label,
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
        type="number"
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

NumberEntry.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.number,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default NumberEntry;
