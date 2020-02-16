import React, { useContext, useState } from "react";

import SeriesContext from "../../../context/series/seriesContext";
import TextEntry from "../../form-parts/TextEntry";
import SelectType from "../../form-parts/SelectType";
import TextArea from "../../form-parts/TextArea";
import FileUpload from "../../form-parts/FileUpload";

const CreateSeries = () => {
  const seriesContext = useContext(SeriesContext);
  const { createSeries } = seriesContext;
  const [newSeries, setField] = useState({
    seriesName: "",
    seriesType: "",
    seriesDesc: "",
    image: null,
    imageAlt: ""
  });

  const { seriesName, seriesType, seriesDesc, image, imageAlt } = newSeries;

  const uploadFile = e => {
    setField({ ...newSeries, image: e.target.files[0] });
  };

  const onChange = e => {
    setField({ ...newSeries, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createSeries(newSeries);
  };

  return (
    <div className="hp-form">
      <div className="hp-form_container">
        <h2>Create New Series</h2>
        <form onSubmit={onSubmit}>
          <TextEntry
            name="seriesName"
            placeholder="Series Name"
            value={seriesName}
            label="Series Name"
            onChange={onChange}
          />
          <h3>Series Type</h3>
          <SelectType name="seriesType" type={seriesType} onChange={onChange} />
          <TextArea
            name="seriesDesc"
            placeholder="Series Description"
            value={seriesDesc}
            label="Series Description"
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
          <input className="hp-form_btn" type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export default CreateSeries;
