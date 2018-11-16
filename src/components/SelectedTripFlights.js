import React from "react";
import {loginUser} from "../actions/phil";
import {receiveFlightsFromDB} from "../actions/tomactions";

class SelectedTripFlights extends React.Component{
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
        this.removeFlightFromDB = this.removeFlightFromDB.bind(this)
    }

    componentDidMount(){
        this.props.fetchFlightsFromDB(this.props.tripId)
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
                   console.log(flightIdRemoved)
                });
    }

    handleClick(flightId){
        console.log("You clicked remove flight");
        this.removeFlightFromDB(flightId)
            .then(() =>{
                let updatedFlightsFromDB = this.props.flightsFromDB.filter(flight => flight.id !== flightId);
                this.props.receiveFlightsFromDB(updatedFlightsFromDB)
            })
    }

    render() {
        if (!this.props.flightsFromDB){
            return null
        } else {
         return (
            <div>
                {
                    this.props.flightsFromDB.map(flight => {
                        return (
                            <div>
                                <p>Origin Airport: {flight.airport_from} - {flight.city_from}</p>
                                <p>Destination Airport: {flight.airport_to} - {flight.city_to}</p>
                                <p>Outbound Flight Date: {flight.outbound_flight_date}</p>
                                <p>Outbound Flight Departure Time: {flight.outbound_local_departure_time}</p>
                                <p>Outbound Flight Arrival Time: {flight.outbound_local_arrival_time}</p>
                                <p>Return Flight Date: {flight.return_flight_date}</p>
                                <p>Return Flight Departure Time: {flight.return_local_departure_time}</p>
                                <p>Return Flight Arrival Time: {flight.return_local_arrival_time}</p>
                                <p>Price: {flight.price}</p>
                                <button type="button" onClick={() => this.handleClick(flight.id)}> Remove</button>
                            </div>
                        )
                    })
                }
            </div>
         )}
    }
}
export default SelectedTripFlights