import React from 'react';
import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

function SuggestionInput({handleChange,handleSubmit}) {

    return (

        <section className="suggestion-create">
            <header className="suggestion-create__header">
                <h2 className="suggestion-create__title">
                {/* Make suggestions for [array of trip members by {fname}] last in array to be prepended by "and" , appended by 's {trip.name} trip */}
                </h2>
            </header>

            <form className="suggestion-frm" onSubmit={event => handleSubmit(event)}>
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
                <div>
                    <label className="suggestion-frm__commentlabel" htmlFor="comment">Why should we go there?</label>
                    <textarea 
                        className="suggestion-frm__comment"
                        id="suggestion-comment"
                        name="comment"
                        onChange={event => handleChange(event)} >
                    </textarea>
                </div>
                <button type="submit" className="suggestion-frm__submit btn btn__submit">Submit</button>
            </form>
        </section>
    )
  }

export default SuggestionInput;