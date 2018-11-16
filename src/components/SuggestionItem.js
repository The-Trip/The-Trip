import React from "react";
import "../styles/components/SuggestionItem.scss";
import CommentsContainer from "../containers/CommentsContainer";

function SuggestionItem({ suggestion, tripId, comments }) {
  return (
    <article className="suggestion">
      <header className="suggestion__header container">
        <h2 className="suggestion__title">
          {suggestion.place_name}
          <div className="suggestion__details">
            {suggestion.place_category}&nbsp;
            <span>Suggested by {suggestion.first_name}</span>
          </div>
        </h2>
      </header>
      <div className="suggestion__body container">
        {suggestion.photo && (
          <figure
            className="suggestion__figure"
            style={{
              backgroundImage: `url(/api/google-photo/${suggestion.photo}`
            }}
          />
        )}
        <p className="suggestion__address">{suggestion.place_address}</p>
        <p className="suggestion__comment">{suggestion.comment}</p>
      </div>

      <footer className="suggestion__footer container">
        <React.Fragment>
          <CommentsContainer
            key={suggestion.id}
            suggestion={suggestion}
            tripId={tripId}
          />
        </React.Fragment>
      </footer>
    </article>
  );
}

export default SuggestionItem;
