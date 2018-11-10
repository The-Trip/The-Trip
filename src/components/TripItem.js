// TODO .trip.details - add details field to DB


import React from "react";
import { Link } from "react-router-dom";

import '../styles/components/TripItem.scss';

function TripItem({trip}){
    console.log(trip)
    const to = `/trip/${trip.id}/suggestion`

        return (
            <div>
                <React.Fragment>
                    
                    <article className="card">
                        
                        <figure className="card__figure">
                        <h1 className="card__destination"><span>{trip.destination}</span></h1>
                            <img src="../static/images/newyork.jpg" alt="newyork" />
                        </figure>

                        <header className="card__header container">

                            <h2 className="card__title">
                                {/* [array of trip members by {fname}]
                                last in array to be prepended by "and" , appended by 's */}
                                {trip.name}</h2>
                        </header>
                    
                        {/* IF Conditional content {!!tripdetails && } */}
                        <section className ="card__details container">
                            <p>
                                It's our honeymoon and we've been dreaming of eating oysters and staring into each others' eyes on the top of the Empire State Building. King Kong style.
                                {trip.details}
                            </p>
                        </section>

                        <footer className="card__footer">

                            <section className="card__itinerary">
                            <Link to={to}><i className="fas fa-clipboard-list"></i> Itinerary </Link>     
                            </section>

                            <section className="card__suggestions">
                            <Link to={to} className="card__suggestions--title">Suggestions</Link>
                            <Link to={to}>
                                <ul className="card__suggestors menu--settings">
                                    <li className="card__suggestor">M</li>
                                    <li className="card__suggestor">C</li>
                                    <li className="card__suggestor">P</li>
                                    <li className="card__suggestor">T</li>
                                </ul>
                            </Link>
                            </section>
                        </footer>
                        
                    </article>
                
                </React.Fragment>
            </div>
        );
}

export default TripItem;
