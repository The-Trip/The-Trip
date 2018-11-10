// TODO .trip.details - add details field to DB


import React from "react";
import { Link } from "react-router-dom";

import '../styles/components/TripItem.scss';

function TripItem({trip}){
    const to = `/trip/${trip.id}/suggestion`

        return (
            <div>
                <React.Fragment>
                    
                    <article className="trip__card">
                        
                        <figure>
                            <img src="../static/images/newyork.jpg" alt="newyork" />
                        </figure>

                        <header className="card__header container">
                            <h1 className="card__title">{trip.name}</h1>
                            <h2 className="card__destination">
                                {/* [array of trip members by {fname}]
                                last in array to be prepended by "and" , appended by 's */}
                                {trip.destination}</h2>
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
                            <Link to={to}>Itinerary</Link>     
                            </section>

                            <section className="card__suggestions">
                            <Link to={to}>Suggestions</Link>
                                <ul className="suggestion__list">
                                    <li className="suggestion__item">M</li>
                                    <li className="suggestion__item">P</li>
                                    <li className="suggestion__item">T</li>
                                    <li className="suggestion__item">C</li>
                                </ul>
                            </section>
                        </footer>
                        
                    </article>
                
                </React.Fragment>
            </div>
        );
}

export default TripItem;
