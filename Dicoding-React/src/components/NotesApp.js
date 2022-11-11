import React, { Component, useMemo } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import ActivePage from "../pages/ActivePage";
import DetailPage from "../pages/DetailPage";
import NoteInput from "./NoteInput";
import ArchivePage from "../pages/ArchivePage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import {
  putAccessToken,
  getUserLogged,
  getActiveNotes,
  deleteNote,
  archiveNote,
  getArchivedNotes,
  unarchiveNote,
} from "../utils/api";
import { ThemeProvider } from "../contexts/ThemeContext";
import { useState } from "react";
import LocaleContext from "../contexts/LocaleContext";
import PropTypes from "prop-types";
import { FiCoffee } from "react-icons/fi";

function NotesAppWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locale, setLocale] = useState("id");

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale.locale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return {
        locale: newLocale,
      };
    });
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const title = searchParams.get("title");

  return (
    <NotesApp
      toggleLocale={toggleLocale}
      localeContextValue={localeContextValue}
      params={title}
      onSearchParams={setSearchParams}
    />
  );
}

class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchedNotes: [],
      searchTitle: "",
      params: props.params ? props.params : "",
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "dark",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";

          localStorage.setItem("theme", newTheme);

          return {
            theme: newTheme,
          };
        });
      },
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchChangeEventHandler =
      this.onSearchChangeEventHandler.bind(this);
    this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.clearParams = this.clearParams.bind(this);
  }

  async componentDidMount() {
    const { data, error: userError } = await getUserLogged();
    const { data: active } = await getActiveNotes();
    const { data: archived } = await getArchivedNotes();
    document.documentElement.setAttribute("data-theme", this.state.theme);
    if (!userError) {
      this.setState(() => {
        return {
          authedUser: data,
          notes: [...active, ...archived],
          initializing: false,
        };
      });
    } else {
      putAccessToken("");
      this.setState(() => {
        return {
          authedUser: null,
          notes: [],
          initializing: false,
        };
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
        notes: [],
      };
    });
    putAccessToken("");
  }

  clearParams() {
    this.setState(() => {
      return {
        params: "",
        searchTitle: "",
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    const { data: active } = await getActiveNotes();
    const { data: archived } = await getArchivedNotes();

    this.setState(() => {
      return {
        authedUser: data,
        notes: [...active, ...archived],
      };
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);

    const { data: active } = await getActiveNotes();
    const { data: archived } = await getArchivedNotes();
    this.setState(() => {
      return {
        notes: [...active, ...archived],
      };
    });
  }

  async onArchiveHandler(id) {
    await archiveNote(id);

    const { data: active } = await getActiveNotes();
    const { data: archived } = await getArchivedNotes();
    this.setState(() => {
      return {
        notes: [...active, ...archived],
      };
    });
  }

  async onUnarchiveHandler(id) {
    await unarchiveNote(id);

    const { data: archived } = await getArchivedNotes();
    const { data: active } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: [...active, ...archived],
      };
    });
  }

  onSearchEventHandler(searchedTitle) {
    let searchedNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(searchedTitle.toLocaleLowerCase())
    );
    if (this.state.searchTitle.length >= 0) {
      this.setState({ searchedNotes: null });
      this.setState({ searchedNotes: searchedNotes });
    } else {
      this.setState({ searchedNotes: null });
      this.setState({ searchedNotes: this.state.notes });
    }
  }

  onSearchChangeEventHandler(event) {
    this.setState((prevState) => {
      return {
        ...prevState,
        params: event.target.value,
        searchTitle: event.target.value,
      };
    });
    this.onSearchEventHandler(event.target.value);
  }

  async onAddNoteHandler() {
    const { data: archived } = await getArchivedNotes();
    const { data: active } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: [...active, ...archived],
      };
    });
  }

  render() {
    if (this.state.initializing) {
      return (
        <div className="loading">
          <FiCoffee size={70} />
          <h1>LOADING</h1>
        </div>
      );
    }
    if (this.state.authedUser === null) {
      return (
        <LocaleContext.Provider value={this.props.localeContextValue}>
          <Routes>
            <Route
              path="/*"
              element={<LoginPage loginSuccess={this.onLoginSuccess} />}
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </LocaleContext.Provider>
      );
    }

    return (
      <LocaleContext.Provider value={this.props.localeContextValue}>
        <ThemeProvider value={this.state}>
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <ActivePage
                    notes={this.state.notes}
                    onDeleteHandler={this.onDeleteHandler}
                    onArchiveHandler={this.onArchiveHandler}
                    searchedNotes={this.state.searchedNotes}
                    searchedTitle={this.state.searchTitle}
                    params={this.state.params}
                    onSearchChange={this.onSearchChangeEventHandler}
                    searchTitle={this.state.searchTitle}
                    logout={this.onLogout}
                    clearParams={this.clearParams}
                  />
                }
              ></Route>
              <Route
                path="/archives"
                element={
                  <ArchivePage
                    notes={this.state.notes}
                    onDeleteHandler={this.onDeleteHandler}
                    onUnarchiveHandler={this.onUnarchiveHandler}
                    searchedNotes={this.state.searchedNotes}
                    searchedTitle={this.state.searchTitle}
                    params={this.state.params}
                    onSearchChange={this.onSearchChangeEventHandler}
                    searchTitle={this.state.searchTitle}
                    logout={this.onLogout}
                    clearParams={this.clearParams}
                  />
                }
              ></Route>
              <Route
                path="/addnote"
                element={<NoteInput addNote={this.onAddNoteHandler} />}
              ></Route>
              <Route
                path="/note-:id"
                element={
                  <DetailPage
                    notes={this.state.notes}
                    archiveHandler={this.onArchiveHandler}
                    unarchiveHandler={this.onUnarchiveHandler}
                    onSearchChange={this.onSearchChangeEventHandler}
                    searchTitle={this.state.searchTitle}
                    onDeleteHandler={this.onDeleteHandler}
                    logout={this.onLogout}
                  />
                }
              ></Route>

              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </div>
        </ThemeProvider>
      </LocaleContext.Provider>
    );
  }
}

NotesApp.propTypes = {
  params: PropTypes.string,
  localeContextValue: PropTypes.object,
};

export default NotesAppWrapper;
