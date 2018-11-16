import React from "react";

function AddIndivComment({ handleCommentSubmit, place, tripId, handleChange }) {
  return (
    <div>
      <form
        className="suggestion-frm"
        onSubmit={event => handleCommentSubmit(place, tripId, event)}
      >
        <label className="suggestion-frm__commentlabel" htmlFor="comment">
          Add a comment
        </label>
        <textarea
          className="suggestion-frm__comment"
          id="suggestion-comment"
          name="comment"
          onChange={event => handleChange(event)}
        />
        <button
          type="submit"
          className="suggestion-frm__submit btn btn__submit"
        >
          Add
        </button>
      </form>
    </div>

    /* <form>
<div>
    <label className="suggestion-frm__commentlabel" htmlFor="comment">Why should we go there????????</label>
    <textarea 
        className="suggestion-frm__comment"
        id="suggestion-comment"
        name="comment"
        onChange={event => handleChange(event)} >
    </textarea>
</div>

<button type="submit" className="suggestion-frm__submit btn btn__submit">Submit</button>
</form>     */
  );
}

export default AddIndivComment;
