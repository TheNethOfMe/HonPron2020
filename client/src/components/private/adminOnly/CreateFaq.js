import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
// Context
import FaqContext from "../../../context/about/faqContext";
// Form Parts
import TextEntry from "../../form-parts/TextEntry";
import NumberEntry from "../../form-parts/NumberEntry";
import TextArea from "../../form-parts/TextArea";

const CreateFaq = ({ match }) => {
  let history = useHistory();
  const faqContext = useContext(FaqContext);
  const { singleFaq, getOneFaq, createFaq, updateFaq } = faqContext;
  const [faqData, setField] = useState({
    question: "",
    answer: "",
    author: "",
    order: 0
  });

  useEffect(() => {
    if (match.params.id) {
      getOneFaq(match.params.id);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (match.params.id && !!singleFaq.question) {
      let fillData = { ...singleFaq };
      delete fillData.__v;
      setField({ ...faqData, ...fillData });
    }
    // eslint-disable-next-line
  }, [singleFaq]);

  const { question, answer, author, order } = faqData;

  const onChange = e => {
    setField({ ...faqData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (match.params.id) {
      updateFaq(match.params.id, faqData);
    } else {
      createFaq(faqData);
    }
    history.push("/manage-faqs");
  };

  return (
    <div className="hp-form">
      <div className="hp-form_container">
        <h2>{match.params.id ? "Update Faq" : "Create New Faq"}</h2>
        <form onSubmit={onSubmit}>
          <TextEntry
            name="author"
            placeholder="Author (optional)"
            value={author}
            label="Author (optional)"
            onChange={onChange}
          />
          <TextArea
            name="question"
            placeholder="Question"
            value={question}
            label="Question"
            onChange={onChange}
            rows={4}
          />
          <TextArea
            name="answer"
            placeholder="Answer"
            value={answer}
            label="Answer"
            onChange={onChange}
            rows={4}
          />
          <NumberEntry
            name="order"
            placeholder="Order"
            value={order}
            label="Order"
            onChange={onChange}
          />
          <input className="hp-form_btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

CreateFaq.propTypes = {
  match: PropTypes.object
};

export default CreateFaq;
