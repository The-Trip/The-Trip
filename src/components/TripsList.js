import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import TripsListItem from "./TripsListItem.js";
import TripCreationContainer from "../containers/TripCreationContainer.js";
import UserInviteContainer from "../containers/UserInviteContainer.js";
import "../styles/components/TripsList.scss";
import "../styles/base/tabs.scss";

class TripsList extends React.Component {
  componentDidMount() {
    console.log(this.props.trips);
    this.props.fetchTripsFromDB(this.props.userId);
  }

  render() {
    const myTripsUrl = `/trips/`;
    const friendsTripsUrl = `/trips/friends`;

    return (
      <div>
        <React.Fragment>
          {/* <TripCreationContainer /> */}

          <section className="trips">
            <div className="tabs tabs-style-topline">
              <nav className="tabs__nav">
                <ul className="tabs__navlist">
                  <li className="tabs__navitem">
                    <NavLink
                      exact
                      to={myTripsUrl}
                      className="mytrips-toggle icon icon-user"
                    >
                      <span>My trips</span>
                    </NavLink>
                  </li>
                  <li className="tabs__navitem">
                    <NavLink
                      exact
                      to={friendsTripsUrl}
                      className="friendstrips-toggle icon icon-userfriends"
                    >
                      <span>Friends&rsquo; trips</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>

              <div className="tabs__content">
                <Switch>
                  <Route
                    path="/trips/"
                    exact
                    render={() => (
                      <section className="myView">
                        {this.props.trips
                          .filter(trip => trip.permission === "owner")
                          .map(trip => {
                            return <TripsListItem key={trip.id} trip={trip} />;
                          })}
                        {this.props.trips.filter(
                          trip => trip.permission === "owner"
                        ).length === 0 ? (
                          <Route
                            path="/trips/"
                            component={TripCreationContainer}
                          />
                        ) : null}
                      </section>
                    )}
                  />
                  <Route
                    path="/trips/friends"
                    exact
                    render={() => (
                      <section className="friendsView">
                        {console.log(
                          this.props.trips.filter(
                            trip => trip.permission === "suggester"
                          )
                        )}
                        {this.props.trips
                          .filter(trip => trip.permission === "suggester")
                          .map(trip => {
                            return <TripsListItem key={trip.id} trip={trip} />;
                          })}
                        {this.props.trips.filter(
                          trip => trip.permission === "suggester"
                        ).length === 0 ? (
                          <Route
                            path="/trips/"
                            component={UserInviteContainer}
                          />
                        ) : null}
                      </section>
                    )}
                  />
                </Switch>
              </div>
            </div>
          </section>
        </React.Fragment>
      </div>
    );
  }
}

export default TripsList;
