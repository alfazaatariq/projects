import React, { useContext } from "react";
import Search from "./Search";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { TbLanguage } from "react-icons/tb";
import ToggleTheme from "./ToggleTheme";
import LocaleContext from "../contexts/LocaleContext";

const Header = ({ onSearchChange, searchTitle, logout, clearParams }) => {
  const { toggleLocale } = useContext(LocaleContext);

  return (
    <div className="note-app__header">
      <h1>
        <Link to="/" onClick={() => clearParams()}>
          {localStorage.getItem("locale") === "id" ? "NotesKu" : "MyNotes"}
        </Link>
      </h1>
      <span>
        <TbLanguage
          size={30}
          style={{ marginRight: "15px", cursor: "pointer" }}
          onClick={toggleLocale}
        />
      </span>
      <span>
        <ToggleTheme />
      </span>
      <span>
        <FiLogOut
          onClick={logout}
          size={30}
          style={{ marginRight: "15px", cursor: "pointer" }}
        />
      </span>
      <div className="note-search">
        <Search searchTitle={searchTitle} onSearchChange={onSearchChange} />
      </div>
    </div>
  );
};

Header.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchTitle: PropTypes.string,
  logout: PropTypes.func.isRequired,
  clearParams: PropTypes.func,
};

export default Header;
