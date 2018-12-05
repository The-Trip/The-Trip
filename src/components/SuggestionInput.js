import React, { useEffect } from "react";
import "../styles/components/SuggestionInput.scss";

import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

function SuggestionInput({
  suggestionInputClearState,
  handleSubmit,
  handleChange,
  tripId
}) {
  useEffect(() => {
    suggestionInputClearState();
  }, []);

  return (
    <section className="suggestion-create">
      <header className="suggestion-create__header">
        <h2 className="suggestion-create__title">
          {/* Make suggestions for [array of trip members by {fname}] last in array to be prepended by "and" , appended by 's {trip.name} trip */}
        </h2>
      </header>

      <form
        className="suggestion-frm"
        onSubmit={event => handleSubmit(event, tripId, handleChange)}
      >
        <div className="suggestion-frm__wrapper frm--inline">
          <label
            className="suggestion-frm__placelabel show--screenreaders"
            htmlFor="place"
          >
            Add a suggestion
          </label>
          <input
            className="suggestion-frm__place"
            id="place"
            type="text"
            name="place"
            placeholder="Add a suggestion"
            onChange={event => handleChange(event)}
          />
          <button
            type="submit"
            className="suggestion-frm__submit btn btn--primary btn__submit"
          >
            Go
          </button>
        </div>
        <PlaceResultsContainer />
      </form>
    </section>
  );
}

export default SuggestionInput;
