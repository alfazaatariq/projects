import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const LoginInput = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onEmailChangeHandler(e) {
    setEmail(e.target.value);
  }
  function onPasswordChangeHandler(e) {
    setPassword(e.target.value);
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    login({ email, password });
  }
  return (
    <>
      <form onSubmit={onSubmitHandler} className="login-input">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChangeHandler}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChangeHandler}
        />
        <button>
          {localStorage.getItem("locale") === "id" ? "Masuk" : "Login"}
        </button>
      </form>
    </>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
