import React from "react";
import { Link } from "react-router-dom";

import '../styles/components/TripItem.scss';

function TripItem({trip}){
    console.log(trip)
    const to = `/trip/${trip.id}/suggestion`

        return (
            <div>
                <React.Fragment>
                    
                    <article className="trip__card">
                        
                        <header className="trip__header">
                            <h1 className="trip__title">{trip.name}</h1>
                            <h2 className="trip__destination">
                                {/* [array of trip members by {fname}]
                                last in array to be prepended by "and" , appended by 's */}
                                {trip.destination}</h2>
                        </header>
                    
                    
                            {/* IF Conditional content {!!tripdetails && } */}

                            <p className="trip__details">
                                {trip.details}
                            </p>
                            

                        <footer className="trip__footer">
                            <Link to={to}>View Suggestions</Link> <span></span>
                        </footer>
                        
                    </article>
                
                </React.Fragment>
            </div>
        );
}

export default TripItem;
