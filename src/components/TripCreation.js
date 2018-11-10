import React from "react";
import '../styles/components/TripCreation.scss';

function TripCreation({handleChange,handleSubmit}) {

return (
    <React.Fragment>

    <section className="trip-create container">

      <header className="trip-create__header">
          <h1 className="trip-create__title">Create new trip</h1>
      </header>

      <form className="trip-frm" onSubmit={event => handleSubmit(event)}>

        <div>
            <label className="trip-frm__tripnamelabel" htmlFor="tripName">Title of Trip</label>
            <input
                className="trip-frm__tripname"
                id="trip-name"
                type="text"
                name="tripName"
                onChange={event => handleChange(event)}
                required /><span className="validity"></span>
        </div>
        <div>
            <label className="trip-frm__originlabel" htmlFor="origin">Origin</label>
            <input
                className="trip-frm__origin"
                type="text"
                id="origin"
                name="origin"
                onChange={event => handleChange(event)}
                required /><span className="validity"></span>
        </div>
        <div>
            <label className="trip-frm__destinationlabel" htmlFor="destination">Destination</label>
            <input
                className="trip-frm__destination"
                type="text"
                id="destination"
                name="destination"
                onChange={event => handleChange(event)}
                required /><span className="validity"></span>
        </div>

        <div>
            <label className="trip-frm__detailslabel" htmlFor="details">About the trip</label>
            <textarea 
                className="trip-frm__details"
                id="trip-details"
                name="details"
                onChange={event => handleChange(event)}>
            </textarea>
        </div>

        <button type="submit" className="trip-frm__submit btn btn__submit">Submit</button>

        </form>
      </section>
     </React.Fragment>

  );
}



export default TripCreation;
