import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";

function RegisterPage() {
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  const navigate = useNavigate();

  return (
    <section className="register-page">
      <h2>{localStorage.getItem("locale") === "id" ? "Daftar" : "Register"}</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {localStorage.getItem("locale") === "id" ? (
          <>
            Kembali ke{" "}
            <Link to="/" style={{ textDecoration: "underline" }}>
              Masuk
            </Link>
          </>
        ) : (
          <>
            Return to{" "}
            <Link to="/" style={{ textDecoration: "underline" }}>
              Login
            </Link>
          </>
        )}
      </p>
    </section>
  );
}

export default RegisterPage;
