
import React from 'react';
import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

function SuggestionInputFinal({handleSubmit,place, tripId, handleChange}) {



    return (


    <div>
        <h2>{place.name}</h2>
        <h3>{place.formatted_address}</h3>
        <h3>{place.rating}</h3>
        <h3>{place.types[0]}</h3>
        <form className="suggestion-frm" onSubmit={() => handleSubmit(place, tripId)}>
        <label className="suggestion-frm__commentlabel" htmlFor="comment">Why should we go there????????</label>
    <textarea 
        className="suggestion-frm__comment"
        id="suggestion-comment"
        name="comment"
        onChange={event => handleChange(event)} 
        >
    </textarea>
        <button type="submit" className="suggestion-frm__submit btn btn__submit">Submitting</button>
        </form>
    </div>



/* <form>
<div>
    <label className="suggestion-frm__commentlabel" htmlFor="comment">Why should we go there????????</label>
    <textarea 
        className="suggestion-frm__comment"
        id="suggestion-comment"
        name="comment"
        onChange={event => handleChange(event)} >
    </textarea>
</div>

<button type="submit" className="suggestion-frm__submit btn btn__submit">Submit</button>
</form>     */
    
    )
}

export default SuggestionInputFinal;