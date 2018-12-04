import React from "react";
import "../styles/components/SelectedTripFlights.scss";
import { loginUser } from "../actions/phil";
import { receiveFlightsFromDB } from "../actions/tomactions";

class SelectedTripFlights extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.removeFlightFromDB = this.removeFlightFromDB.bind(this);
  }

  componentDidMount() {
    this.props.fetchFlightsFromDB(this.props.tripId);
  }

  // componentDidUpdate(){
  //     this.props.fetchFlightsFromDB(this.props.tripId)
  // }

  removeFlightFromDB(flightId) {
    console.log("start of removing flight");
    return fetch(`/api/flights/${flightId}`, {
      method: "delete"
    })
      .then(response => response.json())
      .then(flightIdRemoved => {
        console.log(flightIdRemoved);
      });
  }

  handleClick(flightId) {
    console.log("You clicked remove flight");
    this.removeFlightFromDB(flightId).then(() => {
      let updatedFlightsFromDB = this.props.flightsFromDB.filter(
        flight => flight.id !== flightId
      );
      this.props.receiveFlightsFromDB(updatedFlightsFromDB);
    });
  }

  render() {
    if (!this.props.flightsFromDB) {
      return null;
    } else {
      return (
        <div>
          {this.props.flightsFromDB.map(flight => {
            return (
              <article key={flight.id} className="selected">
                <div className="selected__display">
                  <table className="selected__table">
                    <tbody>
                      <tr className="selected__city">
                        <td>{flight.city_from}</td>
                        <td>
                          <td>
                            <p>&pound;{flight.price}</p>
                          </td>
                        </td>
                        <td>{flight.city_to}</td>
                      </tr>
                      <tr className="selected__date">
                        <td>{flight.outbound_flight_date}</td>
                        <td>
                          <td>&nbsp;</td>
                        </td>
                        <td>{flight.return_flight_date}</td>
                      </tr>
                      <tr className="selected__outbound">
                        <td>{flight.outbound_local_departure_time}</td>
                        <td>
                          <i className="fas fa-plane" />
                        </td>
                        <td>{flight.outbound_local_arrival_time}</td>
                      </tr>

                      <tr className="selected__details details--out">
                        <td>{flight.airport_from}</td>
                        <td>&nbsp;</td>
                        <td>{flight.airport_to}</td>
                      </tr>

                      <tr className="selected__return">
                        <td>{flight.return_local_departure_time}</td>
                        <td>
                          <i className="fas fa-plane" />
                        </td>
                        <td>{flight.return_local_arrival_time}</td>
                      </tr>

                      <tr className="selected__details details--return">
                        <td>{flight.airport_to}</td>
                        <td>&nbsp;</td>
                        <td>{flight.airport_from}</td>
                      </tr>
                    </tbody>
                  </table>

                  <p>Price: {flight.price}</p>
                  <button
                    type="button"
                    onClick={() => this.handleClick(flight.id)}
                  >
                    {" "}
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      );
    }
  }
}
export default SelectedTripFlights;
