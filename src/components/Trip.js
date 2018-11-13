import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import "../styles/components/Trip.scss";
import TripInfo from "./TripInfo";
import SuggestionsContainer from "../containers/SuggestionsContainer";
import HotelsContainer from "../containers/HotelsContainer";
import FlightWrapper from "../containers/FlightWrapper";

class Trip extends React.Component {
  componentDidMount() {
    console.log("trip : " + this.props.trip);
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
            <header className="trips__header container">
              <h1 className="trips__title">Your trip</h1>
            </header>
            <figure
              className="card__figure"
              style={{
                backgroundImage: `url(${this.props.trip.image})`
              }}
            />
            <h1 className="card__destination">
              <span>{this.props.trip.destination}</span>
            </h1>

            <div className="trip__tabs__links">
              <label htmlFor="flights-toggle">
                <NavLink to={flightsUrl}>Flights</NavLink>
              </label>
              <label htmlFor="hotels-toggle">
                <NavLink to={hotelsUrl}>Hotels</NavLink>
              </label>
              <label htmlFor="suggestions-toggle">
                <NavLink to={suggestionsUrl}>Suggestions</NavLink>
              </label>
            </div>
            <TripInfo trip={this.props.trip} />

            {/* <div className="tabs">
              <Switch>
                <Route
                  path="/trips/:id/"
                  exact
                  render={props => <TripInfo trip={this.props.trip} />}
                />
                <Route path="/trips/:id/flights" component={FlightWrapper} />
                <Route path="/trips/:id/hotels" component={HotelsContainer} />
                <Route
                  path="/trips/:id/suggestions"
                  component={SuggestionsContainer}
                />
              </Switch>
            </div> */}

            <section className="content">
              <Route path="/trips/:id/flights" component={FlightWrapper} />
              <Route path="/trips/:id/hotels" component={HotelsContainer} />
              <Route
                path="/trips/:id/suggestions"
                component={SuggestionsContainer}
              />
            </section>
          </section>
        </React.Fragment>
      </div>
    );
  }
}

export default Trip;
