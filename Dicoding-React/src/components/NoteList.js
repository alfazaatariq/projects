import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

const NoteList = ({ notes, onDelete, onArchive }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          archived={note.archived}
          id={note.id}
          title={note.title}
          onDelete={onDelete}
          onArchive={onArchive}
          createdAt={note.createdAt}
          body={note.body}
        />
      ))}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteList;
