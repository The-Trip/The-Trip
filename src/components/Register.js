import React from "react";
import "../styles/components/Login.scss";

function Register({ handleChangeRegister, handleSubmitRegister }) {
  return (
    <React.Fragment>
      {/* REGISTRATION FORM */}
      <section className="registration container">
        <header className="registration__header">
          <h1 className="registration__title">Register</h1>
        </header>

        <form
          className="registration-frm"
          onSubmit={event => handleSubmitRegister(event)}
        >
          <div>
            <label
              className="registration-frm__namelabel show--screenreaders"
              htmlFor="firstName"
            >
              Name
            </label>
            <input
              className="registration-frm__name"
              placeholder="Name"
              onChange={event => handleChangeRegister(event)}
              type="text"
              name="firstName"
              pattern="[A-Za-z]{3,}"
              required
            />
            <span className="validity" />
          </div>

          <div>
            <label
              className="registration-frm__emaillabel show--screenreaders"
              htmlFor="registrationEmail"
            >
              Email
            </label>
            <input
              className="registration-frm__email"
              placeholder="Email"
              type="email"
              onChange={event => handleChangeRegister(event)}
              name="registrationEmail"
              required
            />
            <span className="validity" />
          </div>

          <div>
            <label
              className="registration-frm__passwordlabel show--screenreaders"
              htmlFor="registrationPassword"
            >
              Password
            </label>
            <input
              className="registration-frm__password"
              placeholder="Password"
              type="password"
              onChange={event => handleChangeRegister(event)}
              name="registrationPassword"
              required
            />
            <span className="validity" />
          </div>

          <button
            type="submit"
            className="registration-frm__submit btn btn__submit"
          >
            Register
          </button>
        </form>
      </section>
    </React.Fragment>
  );
}

export default Register;
