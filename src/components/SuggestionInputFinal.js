
import React from 'react';
import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

function SuggestionInputFinal({handleChange,place}) {



    return (


    <div>
        <h2>{place.name}</h2>
        <h3>{place.formatted_address}</h3>
        <h3>{place.rating}</h3>
        <h3>{place.types[0]}</h3>



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