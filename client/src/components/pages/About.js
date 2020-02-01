import React, { useContext, useEffect } from "react";

import FaqContext from "../../context/about/faqContext";

import MenuWithContext from "../menu/MenuWithContext";

const About = () => {
  const faqContext = useContext(FaqContext);
  const { faqs, getFaqs } = faqContext;
  useEffect(() => {
    getFaqs();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="entry-container">
      <div className="entry-container_list">
        {faqs.map(faq => (
          <div className="faq-item" key={faq._id}>
            {!!faq.author && (
              <p className="faq-item_author">{faq.author} asks...</p>
            )}
            <p className="faq-item_question">Q: {faq.question}</p>
            <p className="faq-item_answer">A: {faq.answer}</p>
          </div>
        ))}
      </div>
      <div className="entry-container_menu">
        <MenuWithContext />
      </div>
    </div>
  );
};

export default About;
