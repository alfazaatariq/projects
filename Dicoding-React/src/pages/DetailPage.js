import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { BiArchive } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { FiCoffee } from "react-icons/fi";
import LocaleContext from "../contexts/LocaleContext";
import { getNote } from "../utils/api";
import NotFoundPage from "./NotFoundPage";

function DetailPageWrapper({
  notes,
  archivedNotes,
  archiveHandler,
  onSearchChange,
  searchTitle,
  onDeleteHandler,
  unarchiveHandler,
  logout,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <DetailPage
      locale={locale}
      toggleLocale={toggleLocale}
      notes={notes}
      archivedNotes={archivedNotes}
      id={id}
      archiveHandler={archiveHandler}
      nav={navigate}
      onSearchChange={onSearchChange}
      searchTitle={searchTitle}
      onDeleteHandler={onDeleteHandler}
      unarchiveHandler={unarchiveHandler}
      logout={logout}
    />
  );
}

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      check: "",
      initializing: true,
    };
  }

  async componentDidMount() {
    const { data, error } = await getNote(this.props.id);

    if (!error) {
      this.setState(() => {
        return {
          note: data,
          check: false,
          initializing: false,
        };
      });
    } else {
      this.setState(() => {
        return {
          check: true,
        };
      });
    }
  }
  render() {
    if (this.state.check === true) {
      return <NotFoundPage />;
    }

    if (this.state.initializing === true) {
      return (
        <div className="loading">
          <FiCoffee size={70} />
          <h1>LOADING</h1>
        </div>
      );
    }

    return (
      <>
        <Header
          onSearchChange={this.props.onSearchChange}
          searchTitle={this.props.searchTitle}
          logout={this.props.logout}
          toggleLocale={this.props.toggleLocale}
        />

        <div className="detail">
          <NoteDetail {...this.state.note} />
        </div>
        <span className="archive">
          {this.state.note.archived === false ? (
            <BiArchiveIn
              size={70}
              onClick={() => {
                this.props.archiveHandler(this.state.note.id);
                this.props.nav("/");
              }}
            />
          ) : (
            <BiArchiveOut
              size={70}
              onClick={() => {
                this.props.unarchiveHandler(this.state.note.id);
                this.props.nav("/archives");
              }}
            />
          )}
        </span>
        <Link to="/archives">
          <span className="archiveIcon">
            <BiArchive size={70} />
          </span>
        </Link>
        {this.state.note.archived === false ? (
          <Link to="/">
            <span
              className="deleteIcon"
              onClick={() => this.props.onDeleteHandler(this.state.note.id)}
            >
              <TiDeleteOutline size={80} />
            </span>
          </Link>
        ) : (
          <Link to="/archives">
            <span
              className="deleteIcon"
              onClick={() => this.props.onDeleteHandler(this.state.note.id)}
            >
              <TiDeleteOutline size={80} />
            </span>
          </Link>
        )}
      </>
    );
  }
}

DetailPageWrapper.propTypes = {
  notes: PropTypes.array.isRequired,
  archiveHandler: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchTitle: PropTypes.string,
  onDeleteHandler: PropTypes.func.isRequired,
  unarchiveHandler: PropTypes.func,
  logout: PropTypes.func,
};

export default DetailPageWrapper;
