import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SeriesContext from "../../../context/series/seriesContext";
import TextEntry from "../../form-parts/TextEntry";
import SelectType from "../../form-parts/SelectType";
import TextArea from "../../form-parts/TextArea";
import FileUpload from "../../form-parts/FileUpload";

const CreateSeries = ({ match }) => {
  let history = useHistory();
  const seriesContext = useContext(SeriesContext);
  const {
    createSeries,
    getSeriesForUpdate,
    singleSeries,
    updateSeries
  } = seriesContext;
  const [seriesData, setField] = useState({
    seriesName: "",
    seriesType: "",
    seriesDesc: "",
    image: null,
    imageAlt: ""
  });

  useEffect(() => {
    if (match.params.id) {
      getSeriesForUpdate(match.params.id);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (match.params.id && !!singleSeries.seriesName) {
      let fillData = { ...singleSeries };
      delete fillData.slug;
      delete fillData.__v;
      delete fillData.id;
      setField({ ...seriesData, ...fillData });
    }
    // eslint-disable-next-line
  }, [singleSeries]);

  const { seriesName, seriesType, seriesDesc, imageAlt } = seriesData;

  const uploadFile = e => {
    setField({ ...seriesData, image: e.target.files[0] });
  };

  const onChange = e => {
    setField({ ...seriesData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (match.params.id) {
      updateSeries(seriesData);
    } else {
      createSeries(seriesData);
    }
    history.push("/manage-series");
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
          <input className="hp-form_btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateSeries;
