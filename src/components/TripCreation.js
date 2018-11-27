import React from "react";

import "../styles/components/TripCreation.scss";

class TripCreation extends React.Component {
  componentDidUpdate(newProps) {
    if (this.props.addedTripId) {
      const tripId = this.props.addedTripId.id;
      newProps.resetAddedTripId();
      newProps.history.push(`/trips/${tripId}`);
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="trip-create container">
          <header className="trip-create__header">
            <h1 className="trip-create__title">Create new Trip</h1>
            <p className="trip-create__intro">
              Looking for action, relaxation &ndash; or something a little bit
              quirky? City jaunt or beachmat? Let your friends know the sort of
              Trip you want&hellip;
            </p>
          </header>

          <form
            className="trip-frm"
            onSubmit={event => this.props.handleSubmit(event)}
          >
            <div>
              <label
                className="trip-frm__tripnamelabel show--screenreaders"
                htmlFor="tripName"
              >
                Title of Trip
              </label>
              <input
                className="trip-frm__tripname"
                id="trip-name"
                type="text"
                name="tripName"
                placeholder="Enter trip title"
                onChange={event => this.props.handleChange(event)}
                required
              />
              <span className="validity" />
            </div>
            <div>
              <label
                className="trip-frm__originlabel show--screenreaders"
                htmlFor="origin"
              >
                Origin
              </label>
              <input
                className="trip-frm__origin"
                type="text"
                id="origin"
                name="origin"
                placeholder="Starting from&hellip;"
                onChange={event => this.props.handleChange(event)}
                required
              />
              <span className="validity" />
            </div>
            <div>
              <label
                className="trip-frm__destinationlabel show--screenreaders"
                htmlFor="destination"
              >
                Destination
              </label>
              <input
                className="trip-frm__destination"
                type="text"
                id="destination"
                name="destination"
                placeholder="Destination"
                onChange={event => this.props.handleChange(event)}
                required
              />
              <span className="validity" />
            </div>

            <div>
              <label
                className="trip-frm__detailslabel show--screenreaders"
                htmlFor="details"
              >
                About the trip
              </label>
              <textarea
                className="trip-frm__details"
                id="trip-details"
                name="details"
                placeholder="About this trip"
                onChange={event => this.props.handleChange(event)}
              />
            </div>

            <button type="submit" className="trip-frm__submit btn btn__submit">
              Submit
            </button>
          </form>
        </section>
      </React.Fragment>
    );
  }
}

export default TripCreation;
