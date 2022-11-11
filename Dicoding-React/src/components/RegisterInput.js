import React, { useState } from "react";
import PropTypes from "prop-types";

const RegisterInput = ({ register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  function onConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    if (confirmPassword === password) {
      register({ name, email, password });
    } else {
      alert("Password tidaklah sama!");
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className="register-input">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={onNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <button>
          {localStorage.getItem("locale") === "id" ? "Daftar" : "Register"}
        </button>
      </form>
    </>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
