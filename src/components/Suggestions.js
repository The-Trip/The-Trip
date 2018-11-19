import React from "react";
import SuggestionInputContainer from "../containers/SuggestionInputContainer.js";
import SuggestionItem from "./SuggestionItem.js";
import "../styles/components/Suggestions.scss";
import SuggestionInputFinalContainer from "../containers/SuggestionInputFinalContainer.js";

class Suggestions extends React.Component {
  componentDidMount() {
    this.props.fetchSuggestionsFromDB(this.props.tripId);
    // this.props.likeFetch(this.props.tripId);
  }

  render() {
    const deDupedSuggest = [];
    const map = new Map();
    for (const item of this.props.suggestions) {
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
          photo: item.photo_reference,
          favourite: item.favourite
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
            console.log(this.props.tripLikes);
            const tripLike = this.props.tripLikes
              ? this.props.tripLikes.filter(
                  like => like.suggestion_id === suggestion.id
                )
              : null;
            console.log(tripLike);
            return (
              <SuggestionItem
                key={suggestion.id}
                suggestion={suggestion}
                tripId={suggestion.trip_id}
                // comments={this.props.comments}
                addLike={this.props.addLike}
                removeLike={this.props.removeLike}
                clickedLike={this.props.clickedLike}
                tripLike={tripLike ? tripLike : null}
                tripFavourites={this.props.tripFavourites}
                removeFavourites={this.props.removeFavourites}
                addFavourites={this.props.addFavourites}
                clickedFav={this.props.clickedFav}
              />
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default Suggestions;
