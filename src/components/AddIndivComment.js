import React from "react";
import "../styles/components/AddIndivComment.scss";

function AddIndivComment({ handleCommentSubmit, place, tripId, handleChange }) {
  return (
    <form
      className="comment-frm"
      onSubmit={event => handleCommentSubmit(place, tripId, event)}
    >
      <label className="comment-frm__commentlabel" htmlFor="comment">
        Add a comment
      </label>
      <textarea
        className="comment-frm__comment"
        id="suggestion-comment"
        name="comment"
        onChange={event => handleChange(event)}
      />
      <button
        type="submit"
        className="comment-frm__submit btn btn__add btn--hidetext"
      >
        Add
      </button>
    </form>
  );
}

export default AddIndivComment;
