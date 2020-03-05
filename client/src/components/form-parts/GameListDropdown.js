import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import GameListContext from "../../context/gamelist/gamelistContext";

const GameListDropdown = ({ label, name, value, onChange }) => {
  const gamelistContext = useContext(GameListContext);
  const { getAllLists, allLists } = gamelistContext;
  useEffect(() => {
    getAllLists();
    // eslint-disable-next-line
  }, []);
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
        <option value="">Select A List</option>
        {allLists.map(list => {
          return (
            <option key={list._id} value={list._id}>
              {list.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

GameListDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default GameListDropdown;
