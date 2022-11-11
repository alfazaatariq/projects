import React, { Component, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function SearchWrapper({ onSearchChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { locale, toggleLocale } = useContext(LocaleContext);

  const title = searchParams.get("title");

  function changeSearchParams(keyword) {
    setSearchParams({ title: keyword });
  }

  return (
    <Search
      locale={locale}
      toggleLocale={toggleLocale}
      searchTitle={title}
      onSearchChange={onSearchChange}
      onSearchParams={changeSearchParams}
      activeKeyword={title}
    />
  );
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  render() {
    return (
      <input
        type="text"
        placeholder={
          localStorage.getItem("locale") === "id"
            ? "Cari catatan..."
            : "Search notes..."
        }
        value={this.props.activeKeyword ? this.props.activeKeyword : ""}
        onChange={(event) => {
          this.props.onSearchChange(event);
          this.props.onSearchParams(event.target.value);
        }}
      />
    );
  }
}

Search.propTypes = {
  searchTitle: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  onSearchParams: PropTypes.func,
  activeKeyword: PropTypes.string,
};

export default SearchWrapper;
