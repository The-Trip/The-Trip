import React from "react";
// import '../styles/components/Login.scss';

function UserInvite({ handleChange, handleSubmit }) {
  return (
    <React.Fragment>
      {/* LOGIN FORM */}
      <section className="login">
        <header className="login__header">
          <h1 className="login__title">Invite</h1>
        </header>

        <form className="login-frm" onSubmit={event => handleSubmit(event)}>
          <div>
            <label className="login-frm__emaillabel" htmlFor="loginEmail">
              Invite Code
            </label>
            <input
              className="login-frm__email"
              type="text"
              onChange={event => handleChange(event)}
              name="inviteCode"
              required
            />
            <span className="validity" />
          </div>

          <button type="submit" className="login-frm__submit btn btn__submit">
            Submit
          </button>
        </form>
      </section>
    </React.Fragment>
  );
}

export default UserInvite;
