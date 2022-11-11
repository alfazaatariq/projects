import React from "react";
import PropTypes from "prop-types";

const Archive = ({ id, archived, onArchive }) => {
  if (archived === false) {
    return (
      <button
        className="note-item__archive-button"
        onClick={() => onArchive(id)}
      >
        Arsipkan
      </button>
    );
  } else if (archived === true) {
    return (
      <button
        className="note-item__archive-button"
        onClick={() => onArchive(id)}
      >
        Pindahkan
      </button>
    );
  }
};

Archive.propTypes = {
  id: PropTypes.number.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default Archive;
