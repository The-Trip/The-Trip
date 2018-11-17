import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import TripsListItem from "./TripsListItem.js";
import "../styles/components/TripsList.scss";
import "../styles/base/tabs.scss";

class TripsList extends React.Component {
  componentDidMount() {
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
            {/* <header className="trips__header container">
              <h1 className="trips__title">Your trips</h1>
            </header> */}

            <div className="tabs tabs-style-topline">
              <nav className="tabs__nav">
                <ul className="tabs__navlist">
                  <li className="tabs__navitem">
                    <NavLink
                      to={myTripsUrl}
                      className="mytrips-toggle icon icon-user"
                    >
                      <span>My trips</span>
                    </NavLink>
                  </li>
                  <li className="tabs__navitem">
                    <NavLink
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
                    render={() => (
                      <section className="myView">
                        {this.props.trips.map(trip => {
                          return <TripsListItem key={trip.id} trip={trip} />;
                        })}
                      </section>
                    )}
                  />
                  <Route
                    path="/trips/friends"
                    render={() => (
                      <section className="friendsView">
                        {this.props.trips.map(trip => {
                          return <TripsListItem key={trip.id} trip={trip} />;
                        })}
                      </section>
                    )}
                  />
                </Switch>
              </div>
            </div>

            {/* {this.props.trips.map(trip => {
              return <TripsListItem key={trip.id} trip={trip} />;
            })} */}
          </section>
        </React.Fragment>
      </div>
    );
  }
}

export default TripsList;
