import PropTypes from "prop-types";
import React, { useContext } from "react";
import NoteList from "../components/NoteList";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { BiArchive } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import LocaleContext from "../contexts/LocaleContext";

const ArchivePage = ({
  notes,
  onDeleteHandler,
  onUnarchiveHandler,
  searchedNotes,
  searchedTitle,
  params,
  onSearchChange,
  searchTitle,
  logout,
  clearParams,
}) => {
  let yesArchived = null;
  const { toggleLocale } = useContext(LocaleContext);

  if (searchedTitle.length > 0) {
    yesArchived = searchedNotes.filter((note) => note.archived === true);
  } else if (params.length > 0) {
    yesArchived = notes.filter(
      (note) =>
        note.archived === true &&
        note.title.toLowerCase().includes(params.toLowerCase())
    );
  } else {
    yesArchived = notes.filter((note) => note.archived === true);
  }
  return (
    <>
      <Header
        onSearchChange={onSearchChange}
        searchTitle={searchTitle}
        logout={logout}
        toggleLocale={toggleLocale}
        clearParams={clearParams}
      />
      <div className="note-app__body">
        <h2>
          {localStorage.getItem("locale") === "id"
            ? "Arsip Catatan"
            : "Archived Notes"}
        </h2>
        {yesArchived.length > 0 ? (
          <NoteList
            notes={yesArchived}
            onDelete={onDeleteHandler}
            onArchive={onUnarchiveHandler}
          />
        ) : (
          <p className="notes-list__empty-message">
            {localStorage.getItem("locale") === "id"
              ? "Tidak ada catatan"
              : "There are no notes"}
          </p>
        )}
      </div>
      <Link to="/archives" onClick={() => clearParams()}>
        <span className="archiveIcon">
          <BiArchive size={70} />
        </span>
      </Link>
      <Link to="/addnote" onClick={() => clearParams()}>
        <span className="addIcon">
          <IoMdAddCircleOutline size={70} />
        </span>
      </Link>
    </>
  );
};

ArchivePage.propTypes = {
  notes: PropTypes.array.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  onUnarchiveHandler: PropTypes.func.isRequired,
  searchedNotes: PropTypes.array,
  searchedTitle: PropTypes.string,
  onSearchChange: PropTypes.func,
  searchTitle: PropTypes.string,
  logout: PropTypes.func,
  clearParams: PropTypes.func,
};

export default ArchivePage;
