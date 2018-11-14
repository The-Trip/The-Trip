import React from "react";
import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

class SuggestionInput extends React.Component {
  componentWillUnmount() {
    console.log("cwu sic");
    this.props.suggestionInputClearState();
  }

  render() {
    return (
      <section className="suggestion-create container">
        <header className="suggestion-create__header">
          <h2 className="suggestion-create__title">
            {/* Make suggestions for [array of trip members by {fname}] last in array to be prepended by "and" , appended by 's {trip.name} trip */}
          </h2>
        </header>

        <form
          className="suggestion-frm"
          onSubmit={event => this.props.handleSubmit(event, this.props.tripId)}
        >
          <div>
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
              required
            />
            <span className="validity" />
          </div>
          <button
            type="submit"
            className="suggestion-frm__submit btn btn__submit"
          >
            Submit
          </button>
          <PlaceResultsContainer />
        </form>
      </section>
    );
  }
}

export default SuggestionInput;
