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
    const flightsUrl = `/trips/${this.props.tripId}/flights`;
    const suggestionsUrl = `/trips/${this.props.tripId}/suggestions`;
    const hotelsUrl = `/trips/${this.props.tripId}/hotels`;

    if (!this.props.trip) {
      return <div>Loading...</div>;
    }

    return (
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

            <div className="tabs__content">
              <Switch>
                <Route path="/trips/:id/flights" component={FlightWrapper} />
                <Route path="/trips/:id/hotels" component={HotelsContainer} />
                <Route
                  path="/trips/:id/suggestions"
                  component={SuggestionsContainer}
                />
              </Switch>
            </div>
          </div>
        </section>

        {/* <div className="content-wrap">
          <section id="section-topline-1">
            <p>1</p>
          </section>
          <section id="section-topline-2">
            <p>2</p>
          </section>
          <section id="section-topline-3">
            <p>3</p>
          </section>
          <section id="section-topline-4">
            <p>4</p>
          </section>
          <section id="section-topline-5">
            <p>5</p>
          </section>
        </div> */}
      </React.Fragment>
    );
  }
}

export default Trip;
