import React from "react";
import { Link } from "react-router-dom";

import "../styles/components/TripsListItem.scss";

function TripsListItem({ trip, tripId, suggestions }) {
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
                {/* [array of trip members by {fname}] last in array to be prepended by "and" , appended by 's */}
                {trip.name}
              </h2>
            </header>

            {!!trip.details && (
              <section className="card__details container">
                <h4>
                  From {trip.origin} to {trip.destination}{" "}
                </h4>
                <p> {trip.details}</p>
              </section>
            )}
            <footer className="card__footer">
              <section className="card__itinerary">
                View trip details&nbsp;
                <i className="fas fa-arrow-alt-circle-right fa-lg" />
              </section>
            </footer>
          </Link>
        </article>
      </React.Fragment>
    </div>
  );
}

export default TripsListItem;
