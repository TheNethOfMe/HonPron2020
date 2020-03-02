import React, { useContext, useState } from "react";

// Context
import TicketContext from "../../context/tickets/ticketContext";
// Form Parts
import TextEntry from "../form-parts/TextEntry";
import TextArea from "../form-parts/TextArea";

const Contact = () => {
  const ticketContext = useContext(TicketContext);
  const { createTicket } = ticketContext;
  const [ticketFields, setField] = useState({
    subject: "",
    topic: "",
    text: "",
    author: ""
  });

  const { subject, topic, text, author } = ticketFields;

  const onChange = e => {
    setField({ ...ticketFields, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createTicket(ticketFields);
  };

  return (
    <div className="hp-form">
      <div className="hp-form_container">
        <h2>Contact Us</h2>
        <h3>Rules</h3>
        <ul>
          <li>
            If you have a suggestion specifically for how the SNEScapades
            ranking list should be changed, use the "SNES List Change" subject.
          </li>
          <li>
            Questions we like or think might be useful for others to see may end
            up in our "FAQs" section.
          </li>
          <li>
            You can always chose to remain anonymous if you wish. Regardless,
            we'll never post emails or full names in the "FAQs" even if your
            question ends up there.
          </li>
          <li>
            If you want a response, please leave your email address in the
            author section (along with your name if desired). Pronouns are also
            helpful.
          </li>
          <li>
            SteampunkLink is the one who will be answering these questions. If
            you have a question for Emmy Zero, he'll try to pass it along.
          </li>
          <li>
            I can't garauntee a response to anyone who wants one, but I'll try
            my best.
          </li>
          <li>
            Nasty notes will be ignored (likely never read) so don't be a jerk
            and keep your critism civil please.
          </li>
          <li>
            This is not a place to promote your podcast, youtube channel, or
            other project unless you are wanting to collaborate in some way with
            us. In that case, contacting SteampunkLink on Twitter (@SNEScapades)
            might be a better option.
          </li>
        </ul>
        <form onSubmit={onSubmit}>
          <TextEntry
            name="subject"
            placeholder="Subject"
            value={subject}
            label="Subject"
            onChange={onChange}
          />
          <TextEntry
            name="author"
            placeholder="Author (optional)"
            value={author}
            label="Author (optional)"
            onChange={onChange}
          />
          <div className="hp-input">
            <label className="hp-input_label" htmlFor="topic">
              Topic
            </label>
            <select name="topic" id="topic" value={topic} onChange={onChange}>
              <option value="">Select A Topic</option>
              <option value="Compliment">Compliment</option>
              <option value="Comment">Suggestion/Comment</option>
              <option value="Complaint">Complaint</option>
              <option value="SNES List">SNES List Change</option>
              <option value="Question">Question</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <TextArea
            name="text"
            placeholder="Your Message Here"
            value={text}
            label="Your Message Here"
            onChange={onChange}
          />
          <input className="hp-form_btn" type="submit" value="Ask Away!" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
