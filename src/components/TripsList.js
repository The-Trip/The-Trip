import React from "react";
import TripsListItem from "./TripsListItem.js";
import "../styles/components/TripsList.scss";
// import TripCreationContainer from "../containers/TripCreationContainer.js";

class TripsList extends React.Component {
  componentDidMount() {
    this.props.fetchTripsFromDB(this.props.userId);
  }

  render() {
    return (
      <div>
        <React.Fragment>
          {/* <TripCreationContainer /> */}

          <section className="trips">
            <header className="trips__header container">
              <h1 className="trips__title">Your trips</h1>
            </header>

            {this.props.trips.map(trip => {
              return (
                // <p key={trip.id} onClick={()=>this.props.handleClick(trip.id)}>{trip.name}</p>

                <TripsListItem key={trip.id} trip={trip} />
              );
            })}
          </section>
        </React.Fragment>
      </div>
    );
  }
}

export default TripsList;
