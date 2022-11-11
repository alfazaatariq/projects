import { ThemeConsumer } from "../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleTheme = () => {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginRight: "15px",
            }}
          >
            {theme === "dark" ? (
              <FaSun size={30} color="white" />
            ) : (
              <FaMoon size={30} />
            )}
          </button>
        );
      }}
    </ThemeConsumer>
  );
};

export default ToggleTheme;
