import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";

const NoteItem = ({ id, title, createdAt, body }) => {
  return (
    <div className="note-item">
      <Link to={`/note-${id}`}>
        <div className="note-item__content">
          <h3 className="note-item__title">{title}</h3>
          <p className="note-item__date">{showFormattedDate(createdAt)}</p>
          <p className="note-item__body">{body}</p>
        </div>
      </Link>
    </div>
  );
};

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItem;
