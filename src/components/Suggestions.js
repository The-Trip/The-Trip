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
    let filteredSuggestions = [];
    if (this.props.contentType === "hotels") {
      filteredSuggestions = this.props.suggestions.filter(
        suggestion => suggestion.place_category === "lodging"
      );
    } else {
      filteredSuggestions = this.props.suggestions.filter(
        suggestion => suggestion.place_category !== "lodging"
      );
    }

    const deDupedSuggest = [];
    const map = new Map();
    for (const item of filteredSuggestions) {
      if (!map.has(item.place_id)) {
        map.set(item.place_id, true); // set any value to Map
        deDupedSuggest.push({
          id: item.id,
          place_name: item.place_name,
          place_address: item.place_address,
          place_category: item.place_category,
          comment: item.comment,
          first_name: item.first_name,
          customer_id: item.customer_id,
          place_id: item.place_id,
          trip_id: item.trip_id,
          photo: item.photo_reference
          // item.photos &&
        });
      }
    }
    return (
      <React.Fragment>
        <section className="suggestions">
          <header className="suggestions__header container">
            <h1 className="suggestions__title">Where to go?</h1>

            {this.props.selectedPlace ? (
              <SuggestionInputFinalContainer tripId={this.props.tripId} />
            ) : (
              <SuggestionInputContainer tripId={this.props.tripId} />
            )}
          </header>

          {deDupedSuggest.map(suggestion => {
            return (
              <SuggestionItem
                key={suggestion.id}
                suggestion={suggestion}
                tripId={suggestion.trip_id}
                comments={this.props.comments}
              />
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default Suggestions;
