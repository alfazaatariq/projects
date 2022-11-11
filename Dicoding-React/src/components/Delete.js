import React from "react";
import PropTypes from "prop-types";

const Delete = ({ id, onDelete }) => {
  return (
    <button className="note-item__delete-button" onClick={() => onDelete(id)}>
      Delete
    </button>
  );
};

Delete.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Delete;
