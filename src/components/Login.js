import React from "react";
import "../styles/components/Login.scss";
import { NavLink } from "react-router-dom";

function Login({
  handleChangeRegister,
  handleChangeLogin,
  handleSubmitLogin,
  handleSubmitRegister
}) {
  return (
    <React.Fragment>
      {/* LOGIN FORM */}
      <section className="login container">
        <header className="login__header">
          <h1 className="login__title">Login</h1>
        </header>

        <form
          className="login-frm"
          onSubmit={event => handleSubmitLogin(event)}
        >
          <div>
            <label
              className="login-frm__emaillabel show--screenreaders"
              htmlFor="loginEmail"
            >
              Email
            </label>
            <input
              className="login-frm__email"
              placeholder="Email"
              type="email"
              onChange={event => handleChangeLogin(event)}
              name="loginEmail"
              required
            />
            <span className="validity" />
          </div>

          <div>
            <label
              className="login-frm__passwordlabel show--screenreaders"
              htmlFor="loginPassword"
            >
              Password
            </label>
            <input
              className="login-frm__password"
              placeholder="Password"
              type="password"
              onChange={event => handleChangeLogin(event)}
              name="loginPassword"
              required
            />
            <span className="validity" />
          </div>

          <button type="submit" className="login-frm__submit btn btn__submit">
            Log in
          </button>
        </form>
      </section>

      {/* REGISTRATION FORM */}
      <section className="registration container">
        <header className="registration__header">
          <NavLink
            to="/register/"
            activeClassName="active"
            className="nav__item"
          >
            <p className="registration__title">Not a user? Register</p>
          </NavLink>
        </header>
      </section>
    </React.Fragment>
  );
}

export default Login;
