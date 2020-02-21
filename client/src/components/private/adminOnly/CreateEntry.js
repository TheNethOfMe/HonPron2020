import React, { useContext, useState, Fragment } from "react";

// Context
import EntryContext from "../../../context/entries/entryContext";
import SeriesState from "../../../context/series/seriesState";
import GameListState from "../../../context/gamelist/gamelistState";
// Form Parts
import TextEntry from "../../form-parts/TextEntry";
import SelectType from "../../form-parts/SelectType";
import TextArea from "../../form-parts/TextArea";
import FileUpload from "../../form-parts/FileUpload";
import SeriesListDropdown from "../../form-parts/SeriesListDropdown";
import GameListDropdown from "../../form-parts/GameListDropdown";

const CreateEntry = () => {
  const entryContext = useContext(EntryContext);
  const { createEntry } = entryContext;
  const [selectedSeries, setSeries] = useState("");
  const [newEntry, setField] = useState({
    title: "",
    entryType: "podcast",
    description: "",
    games: "",
    series: "",
    image: null,
    imageAlt: "",
    urlId: "",
    duration: "",
    episode: "",
    gameList: "",
    blog: "",
    author: ""
  });

  const {
    title,
    entryType,
    description,
    games,
    series,
    image,
    imageAlt,
    urlId,
    duration,
    episode,
    gameList,
    blog,
    author
  } = newEntry;

  const uploadFile = e => {
    setField({ ...newEntry, image: e.target.files[0] });
  };

  const onChange = e => {
    if (e.target.name === "series") {
      setSeries(
        document.getElementById("series").options[
          document.getElementById("series").selectedIndex
        ].text
      );
    }
    setField({ ...newEntry, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createEntry(newEntry);
  };

  return (
    <div className="hp-form">
      <div className="hp-form_container">
        <h2>Create New Entry</h2>
        <form onSubmit={onSubmit}>
          <TextEntry
            name="title"
            placeholder="Entry Title"
            value={title}
            label="Entry Title"
            onChange={onChange}
          />
          <h3>Entry Type</h3>
          <SelectType name="entryType" type={entryType} onChange={onChange} />
          <SeriesState>
            <SeriesListDropdown
              type={entryType}
              label="Select Series"
              name="series"
              value={series}
              onChange={onChange}
            />
          </SeriesState>
          <TextArea
            name="description"
            placeholder="Entry Description"
            value={description}
            label="Entry Description"
            onChange={onChange}
          />
          <FileUpload
            name="image"
            label="Upload Image"
            info="Upload series banner image"
            accept="image/jpg image/png"
            onChange={uploadFile}
          />
          <TextEntry
            name="imageAlt"
            placeholder="Image Alt Text"
            value={imageAlt}
            label="Image Alt Text"
            onChange={onChange}
          />
          <TextArea
            name="games"
            placeholder="Games Featured"
            value={games}
            label="Games Featured"
            onChange={onChange}
            info="Separate games with comma and space (ie. Game One, Game Two)"
          />
          {(entryType === "video" || entryType === "podcast") && (
            <Fragment>
              <TextEntry
                name="urlId"
                placeholder="URL ID (youtube or anchor)"
                value={urlId}
                label="URL ID (youtube or anchor)"
                onChange={onChange}
              />
              <TextEntry
                name="duration"
                placeholder="Duration"
                value={duration}
                label="Duration"
                onChange={onChange}
              />
            </Fragment>
          )}
          {entryType === "blog" && (
            <Fragment>
              <TextEntry
                name="author"
                placeholder="Author"
                value={author}
                label="Author"
                onChange={onChange}
              />
              <TextArea
                name="blog"
                placeholder="Compose Blog Entry"
                value={blog}
                label="Compose Blog Entry"
                onChange={onChange}
              />
            </Fragment>
          )}
          {selectedSeries === "SNEScapades" && (
            <Fragment>
              <TextEntry
                name="episode"
                placeholder="Episode Number"
                value={episode}
                label="Episode Number"
                onChange={onChange}
              />
              <GameListState>
                <GameListDropdown
                  label="Select Game List"
                  name="gameList"
                  value={gameList}
                  onChange={onChange}
                />
              </GameListState>
            </Fragment>
          )}
          <input className="hp-form_btn" type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export default CreateEntry;
