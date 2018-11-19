import React from "react";
import "../styles/components/UserInvite.scss";

function UserInvite({ handleChange, handleSubmit }) {
  return (
    <React.Fragment>
      {/* INVITE FORM */}
      <section className="invite container">
        <header className="invite__header">
          <h1 className="invite__title">Ready to Trip?</h1>
          <p className="invite__intro">
            Enter your invite code to share and discover travel tips and secrets
            you won&rsquo;t find anywhere else, from the experts &ndash; your
            mates.
          </p>
        </header>

        <form className="invite-frm" onSubmit={event => handleSubmit(event)}>
          <div>
            <label
              className="invite-frm__codelabel show--screenreaders"
              htmlFor="inviteCode"
            >
              Invite code
            </label>
            <input
              className="invite-frm__code"
              type="text"
              onChange={event => handleChange(event)}
              name="inviteCode"
              required
            />
            <span className="validity" />
          </div>

          <button type="submit" className="invite-frm__submit btn btn__submit">
            Submit
          </button>
        </form>
      </section>
    </React.Fragment>
  );
}

export default UserInvite;
