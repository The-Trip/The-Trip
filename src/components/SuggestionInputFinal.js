import React from "react";
import "../styles/components/SuggestionInputFinal.scss";

function SuggestionInputFinal({ handleSubmit, place, tripId, handleChange }) {
  const rating = Array.from(Array(Math.round(place.rating)).keys());

  return (
    <section className="add-suggestion">
      <h2 className="add-suggestion__title">{place.name}</h2>
      <p className="add-suggestion__address">{place.formatted_address}</p>

      <p className="add-suggestion__rating">
        {rating.map(item => {
          return <i key={tripId} className="fas fa-star" />;
        })}
      </p>
      {/* <h3>{place.rating}</h3>
      <h3>{place.types[0]}</h3> */}
      <form
        className="add-suggestion__frm"
        onSubmit={event => handleSubmit(place, tripId, event)}
      >
        <label className="add-suggestion__commentlabel" htmlFor="comment">
          Why should we go there?
        </label>
        <textarea
          className="add-suggestion__comment"
          id="suggestion-comment"
          name="comment"
          onChange={event => handleChange(event)}
        />
        <button
          type="submit"
          className="add-suggestion__submit btn btn__submit"
        >
          Add this suggestion
        </button>
      </form>
    </section>
  );
}

export default SuggestionInputFinal;
