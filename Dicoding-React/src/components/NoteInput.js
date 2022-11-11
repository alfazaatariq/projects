import React, { Component, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { addNote } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

function NoteInputWrapper({ addNote }) {
  const navigate = useNavigate();
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <NoteInput
      locale={locale}
      toggleLocale={toggleLocale}
      addNote={addNote}
      nav={navigate}
    />
  );
}

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxChar: 50,
      title: "",
      body: "",
      id: +new Date(),
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  async onAddNoteHandler(title, body) {
    await addNote({ title, body });
    await this.props.addNote();
    this.props.nav("/");
  }

  onTitleChangeEventHandler(ev) {
    const limit = 50;
    const charCount = ev.target.value.length;
    this.setState(() => {
      return {
        title: ev.target.value.slice(0, limit - 1),
        maxChar: limit - charCount,
      };
    });
  }

  onBodyChangeEventHandler(ev) {
    this.setState(() => {
      return {
        body: ev.target.value,
      };
    });
  }

  onSubmitEventHandler(ev) {
    ev.preventDefault();
    this.onAddNoteHandler(this.state.title, this.state.body);
  }

  render() {
    return (
      <div className="note-input">
        <h2>
          {localStorage.getItem("locale") === "id"
            ? "Buat Catatan"
            : "Add Note"}
        </h2>
        <form onSubmit={this.onSubmitEventHandler}>
          <p className="note-input__title__char-limit">
            {localStorage.getItem("locale") === "id"
              ? "Sisa Karakter"
              : "Char left"}{" "}
            {this.state.maxChar}
          </p>
          <input
            className="note-input__title"
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            type="text"
            placeholder={
              localStorage.getItem("locale") === "id" ? "Judul..." : "Title..."
            }
            required
          />
          <textarea
            className="note-input__body"
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            type="text"
            placeholder={
              localStorage.getItem("locale") === "id"
                ? "Tulis Catatan di sini..."
                : "Write here..."
            }
            required
          ></textarea>

          <button type="submit">
            {localStorage.getItem("locale") === "id" ? "Tambahkan" : "Add"}
          </button>
        </form>
      </div>
    );
  }
}

NoteInput.propTypes = {
  nav: PropTypes.func,
  addNote: PropTypes.func,
};

export default NoteInputWrapper;
