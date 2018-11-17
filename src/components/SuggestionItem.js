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
            {suggestion.place_category}&nbsp;Suggested by&nbsp;
            <span>{suggestion.first_name}</span>
          </div>
        </h2>
        <p className="suggestion__address">{suggestion.place_address}</p>
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

        <CommentsContainer
          key={suggestion.id}
          suggestion={suggestion}
          tripId={tripId}
        />
      </div>
    </article>
  );
}

export default SuggestionItem;
