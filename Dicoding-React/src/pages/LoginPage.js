import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>
        {localStorage.getItem("locale") === "id" ? "Silahkan login" : "Login"}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {localStorage.getItem("locale") === "id" ? (
          <>
            Belum punya akun?{" "}
            <Link to="/register" style={{ textDecoration: "underline" }}>
              Daftar di sini
            </Link>
          </>
        ) : (
          <>
            Have not got an account?{" "}
            <Link to="/register" style={{ textDecoration: "underline" }}>
              Register here
            </Link>
          </>
        )}
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
