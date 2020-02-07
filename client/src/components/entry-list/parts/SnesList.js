import React, { Fragment } from "react";
import PropTypes from "prop-types";

const SnesList = props => {
  let display;
  if (props.list.length) {
    display = (
      <ul>
        {props.list.map((game, i) => (
          <li key={`snes-rank-${i}`} className="snes-rankings_item">
            {i + 1}: {game}
          </li>
        ))}
      </ul>
    );
  } else {
    display = <h3>No List to Display</h3>;
  }
  return <Fragment>{display}</Fragment>;
};

SnesList.propTypes = {
  list: PropTypes.array.isRequired
};

export default SnesList;
