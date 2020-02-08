import React, { useContext, useEffect, useState, Fragment } from "react";

import EntryContext from "../../context/entries/entryContext";

import ListItemHead from "../entries/entry-parts/ListItemHead";
import ListItemImg from "../entries/entry-parts/ListItemImg";
import ListItemDetails from "../entries/entry-parts/ListItemDetails";
import SnesList from "../entries/entry-parts/SnesList";
import ListItemFooter from "../entries/entry-parts/ListItemFooter";

const SingleEntry = ({ match }) => {
  const entryContext = useContext(EntryContext);
  const { single, getOneEntry } = entryContext;
  const [isListVisable, toggleList] = useState(false);
  useEffect(() => {
    getOneEntry(match.params.id);
    // eslint-disablse-next-line
  }, []);
  let srcImg;
  if (single.image) srcImg = require(`../../img/entry-img/${single.image}`);
  let contentDisplay;
  if (single.entryType === "podcast")
    contentDisplay = (
      <iframe
        width="400px"
        height="102px"
        src={`https://anchor.fm/honest-piranha/embed/episodes/${single.urlId}`}
        frameBorder="0"
        title={single.title}
        scrolling="no"
      />
    );
  return (
    <div className="single-entry">
      {!single.title ? (
        "No Entry to Display"
      ) : (
        <Fragment>
          <ListItemHead
            series={single.series.seriesName}
            icon={
              single.entryType === "blog"
                ? "fas fa-pencil-alt"
                : `fas fa-${single.entryType}`
            }
          />
          <ListItemImg src={srcImg} alt={single.imageAlt} />
          <div className="single-entry-content">{contentDisplay}</div>
          <ListItemDetails
            date={single.dateAdded}
            title={single.title}
            description={single.description}
          />
          <button
            onClick={() => toggleList(!isListVisable)}
            className="single-entry-list-btn"
          >
            {isListVisable ? "Hide List" : "Show List"}
          </button>
          {isListVisable && <SnesList list={single.formattedList} />}
        </Fragment>
      )}
    </div>
  );
};

export default SingleEntry;
