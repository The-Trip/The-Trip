import React from 'react';
import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

function SuggestionInput({handleChange,handleSubmit, tripId}) {

    return (

        <section className="suggestion-create">
            <header className="suggestion-create__header">
                <h2 className="suggestion-create__title">
                {/* Make suggestions for [array of trip members by {fname}] last in array to be prepended by "and" , appended by 's {trip.name} trip */}
                </h2>
            </header>

            <form className="suggestion-frm" onSubmit={event => handleSubmit(event, tripId)}>
                <div>
                    <label className="suggestion-frm__placelabel" htmlFor="place">Add a suggestion … restaurant, drinking hole, museum, gallery, park, sight, den of iniquity</label>
                    <input
                        className="suggestion-frm__place"
                        id="place"
                        type="text"
                        name="place"
                        onChange={event => handleChange(event)}
                        required /><span className="validity"></span>
                </div>
                <PlaceResultsContainer />
                <SuggestionInputFinalContainer />
                
            </form>
        </section>
    )
  }

export default SuggestionInput;