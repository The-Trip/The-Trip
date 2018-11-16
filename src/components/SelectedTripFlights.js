import React from "react";

class SelectedTripFlights extends React.Component{
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        this.props.fetchFlightsFromDB(this.props.tripId)
    }

    handleClick(){
        console.log("You clicked remove flight")
        //REMOVES FROM FLIGHTSFROMDB ARRAY AND REMOVE FROM DATABASE
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
                                <button type="button" onClick={() => this.handleClick()}> Remove</button>
                            </div>
                        )
                    })
                }
            </div>
         )}
    }
}
export default SelectedTripFlights