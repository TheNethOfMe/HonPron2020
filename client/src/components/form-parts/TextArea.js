import React from "react";

const TextArea = ({
  name,
  placeholder,
  value,
  label,
  info,
  onChange,
  rows = 10
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

export default TextArea;
