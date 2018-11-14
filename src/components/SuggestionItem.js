import React from "react";
import "../styles/components/SuggestionItem.scss";
import CommentsContainer from "../containers/CommentsContainer";

function SuggestionItem({ suggestion, tripId, comments }) {
  return (
    <article className="suggestion__card">
      <header className="suggestion__header">
        <h1 className="suggestion__title">{suggestion.place_name}</h1>
        {/* {votes.filter((vote)=>vote.customerId===customerId).length < 1 && (
                <button className="btn btn__vote btn--small" onClick={(e)=>(addVote(suggestion.id))}><i className="fas fa-plus"></i></button>
                        )}
            {votes.filter((vote)=>vote.customerId===customerId).length > 0 && (
                <button className="btn btn__vote btn--small" onClick={(e)=>(removeVote(suggestion.id))}><i className="fas fa-minus"></i></button>
                        )} */}
      </header>

      {/* IF Conditional content {!!suggestion.comment && } */}
      <p className="suggestion__comments">
        {suggestion.place_address}
        {suggestion.place_category}
        {suggestion.comment}
      </p>
      {suggestion.photo && (
        <img
          src={`/api/google-photo/${suggestion.photo}`}
          alt={suggestion.place_name}
        />
      )}

      <footer className="suggestion__footer">
        Suggested by <span>{suggestion.first_name}</span>
        {/* <ul className="suggestion__voters menu--settings">
                    {votes.map(vote => {
                        return <li className="suggestion__voter" key={vote.voteId}>{vote.fname.charAt(0).toUpperCase()}</li>
                    })}
            </ul> */}
        <React.Fragment>
          <CommentsContainer
            key={suggestion.id}
            suggestionId={suggestion.id}
            tripId={tripId}
          />
        </React.Fragment>
      </footer>
    </article>
  );
}

export default SuggestionItem;
