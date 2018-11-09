import React from "react";
import TripItem from "../components/TripItem.js";
import '../styles/components/Trips.scss';
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
                    
                    <section className="trips">

                        <header className="trips__header">
                            <h1 className="trips__title">Your trips</h1>
                        </header>

                        {this.props.trips.map((trip)=> {
                            return (
                                // <p key={trip.id} onClick={()=>this.props.handleClick(trip.id)}>{trip.name}</p>

                                <TripItem key={trip.id} trip={trip} />
                            )
                        })}
                    
                    </section>
                
                </React.Fragment>
            </div>
        );
    }
}

export default Trips;
