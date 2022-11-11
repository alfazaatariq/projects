import React from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import PropTypes from "prop-types";

const Body = ({
  notes,
  onAddNotesHandler,
  onDeleteHandler,
  onArchiveHandler,
  searchedNotes,
  searchedTitle,
}) => {
  let notArchived = null;
  let yesArchived = null;

  if (searchedTitle.length > 0) {
    notArchived = searchedNotes.filter((note) => note.archived === false);
    yesArchived = searchedNotes.filter((note) => note.archived === true);
  } else {
    notArchived = notes.filter((note) => note.archived === false);
    yesArchived = notes.filter((note) => note.archived === true);
  }

  return (
    <div className="note-app__body">
      <NoteInput addNotes={onAddNotesHandler} />
      <h2>Catatan Aktif</h2>
      {notArchived.length > 0 ? (
        <NoteList
          notes={notArchived}
          onDelete={onDeleteHandler}
          onArchive={onArchiveHandler}
        />
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan</p>
      )}
      <h2>Arsip</h2>
      {yesArchived.length > 0 ? (
        <NoteList
          notes={yesArchived}
          onDelete={onDeleteHandler}
          onArchive={onArchiveHandler}
        />
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan</p>
      )}
    </div>
  );
};

Body.propTypes = {
  notes: PropTypes.object.isRequired,
  onAddNotesHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  onArchiveHandler: PropTypes.func.isRequired,
  searchedNotes: PropTypes.array.isRequired,
  searchedTitle: PropTypes.string,
};

export default Body;
