import React, { useContext, useEffect, Fragment } from "react";

import FaqContext from "../../context/about/faqContext";

const About = () => {
  const faqContext = useContext(FaqContext);
  const { faqs, getFaqs } = faqContext;
  useEffect(() => {
    getFaqs();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {faqs.map(faq => (
        <div className="faq-item" key={faq._id}>
          {!!faq.author && (
            <p className="faq-item_author">{faq.author} asks...</p>
          )}
          <p className="faq-item_question">Q: {faq.question}</p>
          <p className="faq-item_answer">A: {faq.answer}</p>
        </div>
      ))}
    </Fragment>
  );
};

export default About;
