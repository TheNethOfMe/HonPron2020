import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import SeriesContext from "../../context/series/seriesContext";

const GameListDropdown = ({ type, label, name, value, onChange }) => {
  const seriesContext = useContext(SeriesContext);
  const { getAllSeries, allSeries } = seriesContext;
  useEffect(() => {
    getAllSeries({ seriesType: type });
    // eslint-disable-next-line
  }, [type]);
  return (
    <div>
      <label className="hp-input_label" htmlFor={name}>
        {label}
      </label>
      <select
        className="hp-input"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Select A Series</option>
        {allSeries.map(series => {
          return (
            <option key={series._id} value={series._id}>
              {series.seriesName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

GameListDropdown.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default GameListDropdown;
