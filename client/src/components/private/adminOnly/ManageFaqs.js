import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FaqContext from "../../../context/about/faqContext";
import ManageResourceCard from "./ManageResourceCard";

const ManageFaqs = () => {
  const faqContext = useContext(FaqContext);
  const { faqs, getFaqs, deleteFaq } = faqContext;
  useEffect(() => {
    getFaqs();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="admin-manage">
      <h2>Manage Faqs</h2>
      <Link to="/create-faq" className="dashboard_btn">
        Create Faq
      </Link>
      {faqs.map(faq => (
        <ManageResourceCard
          key={faq._id}
          title={faq.question}
          type="podcast"
          linkTo={`/edit-faq/${faq._id}`}
          handleDelete={() => deleteFaq(faq._id)}
        />
      ))}
    </div>
  );
};

export default ManageFaqs;
