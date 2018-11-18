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
            {suggestion.place_category}
            <span>
              &nbsp;Suggested by&nbsp;
              {suggestion.first_name}
            </span>
          </div>
        </h2>
      </header>
      <div className="suggestion__body container">
        <div className="suggestion__likeswrap">
          {suggestion.photo && (
            <figure
              className="suggestion__figure"
              style={{
                backgroundImage: `url(/api/google-photo/${suggestion.photo}`
              }}
            />
          )}
          <button className="suggestion__likebtn">
            <i className="fas fa-heart fa-2x" />
          </button>
        </div>
        <p className="suggestion__address">{suggestion.place_address}</p>

        <CommentsContainer
          key={suggestion.id}
          id={suggestion.id}
          suggestion={suggestion}
          tripId={tripId}
        />
      </div>
    </article>
  );
}

export default SuggestionItem;
