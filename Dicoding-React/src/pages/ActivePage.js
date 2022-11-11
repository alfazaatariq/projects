import React from "react";
import NoteList from "../components/NoteList";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { BiArchive } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

const ActivePage = ({
  notes,
  onDeleteHandler,
  onArchiveHandler,
  searchedNotes,
  searchedTitle,
  params,
  onSearchChange,
  searchTitle,
  logout,
  clearParams,
}) => {
  let notArchived = null;

  const { toggleLocale } = useContext(LocaleContext);

  if (searchedTitle.length > 0) {
    notArchived = searchedNotes.filter((note) => note.archived === false);
  } else if (params.length > 0) {
    notArchived = notes.filter(
      (note) =>
        note.archived === false &&
        note.title.toLowerCase().includes(params.toLowerCase())
    );
  } else {
    notArchived = notes.filter((note) => note.archived === false);
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
            ? "Catatan Aktif"
            : "Active Notes"}
        </h2>
        {notArchived.length > 0 ? (
          <NoteList
            notes={notArchived}
            onDelete={onDeleteHandler}
            onArchive={onArchiveHandler}
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

ActivePage.propTypes = {
  notes: PropTypes.array.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  onArchiveHandler: PropTypes.func.isRequired,
  searchedNotes: PropTypes.array,
  searchedTitle: PropTypes.string,
  params: PropTypes.string,
  onSearchChange: PropTypes.func,
  searchTitle: PropTypes.string,
  logout: PropTypes.func,
  clearParams: PropTypes.func,
};

export default ActivePage;
