import React from "react";
import "../styles/components/SuggestionInput.scss";

import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

class SuggestionInput extends React.Component {
  componentWillUnmount() {
    console.log("cwu sic");
    this.props.suggestionInputClearState();
  }

  render() {
    return (
      <section className="suggestion-create">
        <header className="suggestion-create__header">
          <h2 className="suggestion-create__title">
            {/* Make suggestions for [array of trip members by {fname}] last in array to be prepended by "and" , appended by 's {trip.name} trip */}
          </h2>
        </header>

        <form
          className="suggestion-frm"
          onSubmit={event => this.props.handleSubmit(event, this.props.tripId)}
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
              onChange={event => this.props.handleChange(event)}
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
}

export default SuggestionInput;
