import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import "../styles/components/Trip.scss";
import "../styles/base/tabs.scss";
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
    const tripUrl = `/trips/${this.props.tripId}/`;
    const flightsUrl = `/trips/${this.props.tripId}/flights`;
    const suggestionsUrl = `/trips/${this.props.tripId}/suggestions`;
    const hotelsUrl = `/trips/${this.props.tripId}/hotels`;
    console.log(this.props);
    if (!this.props.trip) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <section className="trip">
          <NavLink to={tripUrl} className="trip-toggle">
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
          </NavLink>
          <div className="tabs tabs-style-topline">
            <nav className="tabs__nav">
              <ul className="tabs__navlist">
                <li className="tabs__navitem">
                  <NavLink
                    to={flightsUrl}
                    className="flights-toggle icon icon-flights"
                  >
                    <span>Flights</span>
                  </NavLink>
                </li>
                <li className="tabs__navitem">
                  <NavLink
                    to={hotelsUrl}
                    className="hotels-toggle icon icon-hotels"
                  >
                    <span>Hotels</span>
                  </NavLink>
                </li>
                <li className="tabs__navitem">
                  <NavLink
                    to={suggestionsUrl}
                    className="suggestions-toggle icon icon-suggestions"
                  >
                    <span>Suggestions</span>
                  </NavLink>
                </li>
              </ul>
            </nav>

            <Route
              exact
              path="/trips/:id/"
              render={() => (
                <section className="tripview container">
                  <header className="tripview__header">
                    <h1 className="tripview__title" />
                    <h2 className="tripview__subtitle">
                      {this.props.trip.name}
                    </h2>
                  </header>
                  <p>{this.props.trip.details}</p>
                  <p>Share this link</p>
                  <p>
                    localhost:8080/invite/{this.props.trip.auth_code_suggest}
                  </p>
                </section>
              )}
            />

            <div className="tabs__content">
              <Switch>
                <Route
                  path="/trips/:id/flights"
                  exact
                  component={FlightWrapper}
                />
                <Route
                  path="/trips/:id/:contentType"
                  component={SuggestionsContainer}
                />
              </Switch>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Trip;
