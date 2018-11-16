import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import "../styles/components/Trip.scss";
import SuggestionsContainer from "../containers/SuggestionsContainer";
import HotelsContainer from "../containers/HotelsContainer";
import FlightWrapper from "../containers/FlightWrapper";

class Trip extends React.Component {
  componentDidMount() {
    if (!this.props.trip) {
      this.props.fetchTripsFromDB(this.props.userId);
    }
  }
  render() {
    const suggestionsUrl = `/trips/${this.props.tripId}/suggestions`;
    const flightsUrl = `/trips/${this.props.tripId}/flights`;
    const hotelsUrl = `/trips/${this.props.tripId}/hotels`;

    if (!this.props.trip) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <React.Fragment>
          <section className="trip">
            <figure
              className="trip__figure"
              style={{
                backgroundImage: `url(${this.props.trip.image})`
              }}
            >
              <h1 className="trip__destination">
                <span>{this.props.trip.destination}</span>
              </h1>
            </figure>

            <nav>
              <ul>
                <li>
                  <NavLink to={flightsUrl} className="flights-toggle">
                    Flights
                  </NavLink>
                </li>
                <li>
                  <NavLink to={hotelsUrl} className="hotels-toggle">
                    Hotels
                  </NavLink>
                </li>
                <li>
                  <NavLink to={suggestionsUrl} className="suggestions-toggle">
                    Suggestions
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="tabs">
              <Switch>
                <Route path="/trips/:id/flights" component={FlightWrapper} />
                <Route path="/trips/:id/hotels" component={HotelsContainer} />
                <Route
                  path="/trips/:id/suggestions"
                  component={SuggestionsContainer}
                />
              </Switch>
            </div>
          </section>
        </React.Fragment>
      </div>
    );
  }
}

export default Trip;
