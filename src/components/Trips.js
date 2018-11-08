import React from "react";
import TripCreationContainer from "../containers/TripCreationContainer.js";
import { Link } from "react-router-dom";


class Trips extends React.Component{
    
    constructor() {
        super();
    }

    componentDidMount(){
        console.log(this.props.userId)
        this.props.fetchTripsFromDB(this.props.userId)
    }

    render() {
        return (
            <div>
                <React.Fragment>
                <TripCreationContainer />
                <p>This is Trips.js</p>

                    {this.props.trips.map((trip)=> {
                        const to = `/trip/${trip.id}/suggestion`
                        return (
                            <Link to={to} key={trip.id}>{trip.name}</Link>
                        )
                    })}

                
                </React.Fragment>
            </div>
        );
    }
}

export default Trips;
