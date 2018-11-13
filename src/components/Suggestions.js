import React from "react";
import SuggestionInputContainer from "../containers/SuggestionInputContainer.js";
import SuggestionItem from "./SuggestionItem.js";
import "../styles/components/Suggestions.scss";
import SuggestionInputFinalContainer from "../containers/SuggestionInputFinalContainer.js";

class Suggestions extends React.Component {
  componentDidMount() {
    this.props.fetchSuggestionsFromDB(this.props.tripId);
  }

  render() {
    return (
      <React.Fragment>
        <section className="suggestions">
          <header className="suggestions__header">
            {/* <h1 className="suggestions__title">{this.props.tripId}</h1> */}

            {this.props.selectedPlace ? (
              <SuggestionInputFinalContainer tripId={this.props.tripId} />
            ) : (
              <SuggestionInputContainer tripId={this.props.tripId} />
            )}
          </header>

          {this.props.suggestions.map(suggestion => {
            return (
              <SuggestionItem key={suggestion.id} suggestion={suggestion} />
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default Suggestions;
