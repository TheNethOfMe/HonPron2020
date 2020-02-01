import React from "react";

const TextEntry = ({
  name,
  placeholder,
  value,
  label,
  type = "text",
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
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
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

export default TextEntry;
