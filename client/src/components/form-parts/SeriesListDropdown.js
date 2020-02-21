import React, { useContext, useEffect } from "react";

import SeriesContext from "../../context/series/seriesContext";

const GameListDropdown = ({ type, label, name, value, onChange }) => {
  const seriesContext = useContext(SeriesContext);
  const { getAllSeries, allSeries } = seriesContext;
  useEffect(() => {
    getAllSeries({ seriesType: type });
    // eslint-disable-next-line
  }, [type]);
  return (
    <div className="hp-input">
      <label className="hp-input_label" htmlFor={name}>
        {label}
      </label>
      <select name={name} id={name} defaultValue={value} onChange={onChange}>
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

export default GameListDropdown;
