import React from 'react';
import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

function SuggestionInput({handleChange,handleSubmit}) {

    return (
      <div>
          <p>Suggestion Input</p>

            <form className="suggestion"
            onSubmit={event => {
                handleSubmit(event);
                }}
            >
            <input
                id="place"
                type="text"
                name="place"
                className="suggestion__place"
                // defaultValue="Trip Name"
                onChange={event => handleChange(event)}
            />
            <PlaceResultsContainer />
            
            <input
                id="comment"
                type="textArea"
                name="comment"
                className="suggestion__comment"
                // defaultValue="Destination"
                onChange={event => handleChange(event)}
            />
            <button
                type="submit"
                >Submit</button>
            </form>


      </div>
    )
  }

export default SuggestionInput;