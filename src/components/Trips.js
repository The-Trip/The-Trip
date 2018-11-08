import React from "react";
import TripCreationContainer from "../containers/TripCreationContainer.js";

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
                        return (
                            <p key={trip.id} onClick={()=>this.props.handleClick(trip.id)}>{trip.name}</p>
                        )
                    })}

                
                </React.Fragment>
            </div>
        );
    }
}

export default Trips;
