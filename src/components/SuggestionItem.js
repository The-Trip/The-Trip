import React from 'react';
import '../styles/components/SuggestionItem.scss';

function SuggestionItem({}) {

    return (
      <article className="suggestion__card">
      
        <header className="suggestion__header">
            <h1 className="suggestion__title">{suggestion.place}</h1>

            {votes.filter((vote)=>vote.customerId===customerId).length < 1 && (
                <button className="btn btn__vote btn--small" onClick={(e)=>(addVote(suggestion.id))}><i className="fas fa-plus"></i></button>
                        )}
            {votes.filter((vote)=>vote.customerId===customerId).length > 0 && (
                <button className="btn btn__vote btn--small" onClick={(e)=>(removeVote(suggestion.id))}><i className="fas fa-minus"></i></button>
                        )}
        </header>

        {/* IF Conditional content {!!suggestion.comment && } */}
        <p className="suggestion__comments">
            {suggestion.comment}
        </p>
    
        <footer className="suggestion__footer">
            Suggested by <span>{fname}</span>
            <ul className="suggestion__voters menu--settings">
                    {votes.map(vote => {
                        return <li className="suggestion__voter" key={vote.voteId}>{vote.fname.charAt(0).toUpperCase()}</li>
                    })}
            </ul>
        </footer>

    </article>
    )
  }

export default SuggestionItem;