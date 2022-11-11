import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";

const NoteDetail = ({ title, createdAt, body }) => {
  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title big-1">{title}</h3>
        <p className="note-item__date big-3">{showFormattedDate(createdAt)}</p>
        <p className="note-item__body big-2">{body}</p>
      </div>
    </div>
  );
};

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteDetail;
