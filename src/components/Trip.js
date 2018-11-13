import React from "react";
import { Route, NavLink } from "react-router-dom";
import "../styles/components/Trip.scss";
import TripsListItem from "./TripsListItem";
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
    if (!this.props.trip) {
      return <div>Loading...</div>;
    }
    const suggestionUrl = `/trips/${this.props.tripId}/suggestions`;
    return (
      <div>
        <React.Fragment>
          <section className="trip">
            <header className="trips__header container">
              <h1 className="trips__title">Your trip</h1>
            </header>

            <div className="trip__tabs__control">
              <input type="radio" name="toggle" id="flights-toggle" />
              <input type="radio" name="toggle" id="hotels-toggle" />
              <input type="radio" name="toggle" id="suggestions-toggle" />

              <div className="tabs">
                <label htmlFor="flights-toggle">Flights</label>
                <label htmlFor="hotels-toggle">Hotels</label>
                <label htmlFor="suggestions-toggle">
                  <NavLink to={suggestionUrl}>Suggestions</NavLink>
                </label>
              </div>

              <section className="content">
                <Route
                  path="/trips/:id/"
                  exact
                  render={props => <TripsListItem trip={this.props.trip} />}
                />
                <Route path="/trips/:id/flights" component={FlightWrapper} />
                <Route path="/trips/:id/hotels" component={HotelsContainer} />
                <Route
                  path="/trips/:id/suggestions"
                  component={SuggestionsContainer}
                />
              </section>
            </div>
          </section>
        </React.Fragment>
      </div>
    );
  }
}

export default Trip;
