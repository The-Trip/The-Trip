import React from "react";
import { Link } from "react-router-dom";

import "../styles/components/TripsListItem.scss";

function TripsListItem({ trip, tripId }) {
  const to = `/trips/${trip.id}/`;

  return (
    <div>
      <React.Fragment>
        <article className="card">
          <Link to={to} className="card__link">
            <figure
              className="card__figure"
              style={{
                backgroundImage: `url(${trip.image})`
              }}
            >
              <h1 className="card__destination">
                <span>{trip.destination}</span>
              </h1>
            </figure>
            <header className="card__header container">
              <h2 className="card__title">
                {/* [array of trip members by {fname}]
                                last in array to be prepended by "and" , appended by 's */}
                {trip.name}
              </h2>
            </header>
            {/* IF Conditional content {!!tripdetails && } */}
            <section className="card__details container">
              <p>{trip.details}</p>
            </section>
            <footer className="card__footer">
              <section className="card__itinerary">
                Trip details&nbsp;
                <i className="fas fa-arrow-alt-circle-right fa-lg" />
              </section>

              <section className="card__suggestions">
                Suggestions
                <ul className="card__suggestors menu--settings">
                  <li className="card__suggestor">M</li>
                  <li className="card__suggestor">C</li>
                  <li className="card__suggestor">P</li>
                  <li className="card__suggestor">T</li>
                </ul>
              </section>
            </footer>
          </Link>
        </article>
      </React.Fragment>
    </div>
  );
}

export default TripsListItem;
