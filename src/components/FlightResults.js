import React from "react";
import "../styles/components/FlightResults.scss";

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function handleClick(
  flightDetail,
  departureTimeReturn,
  arrivalTimeReturn,
  arrivalTimeOutbound,
  departureTimeOutbound,
  startDate,
  endDate,
  tripId
) {
  let flightDetailsObject = {
    tripId: tripId,
    flightCombinationID: flightDetail.route[0].combination_id,
    outboundFlightDate: startDate.toISOString(),
    returnFlightDate: endDate.toISOString(),
    cityFrom: flightDetail.route[0].cityFrom,
    cityTo: flightDetail.route[0].cityTo,
    airportFrom: flightDetail.route[0].flyFrom,
    airportTo: flightDetail.route[0].flyTo,
    outboundLocalArrivalTime: `${addZero(
      arrivalTimeOutbound.getHours()
    )}:${addZero(arrivalTimeOutbound.getMinutes())}:00`,
    outboundLocalDepartureTime: `${addZero(
      departureTimeOutbound.getHours()
    )}:${addZero(departureTimeOutbound.getMinutes())}:00`,
    returnLocalDepartureTime: `${addZero(
      departureTimeReturn.getHours()
    )}:${addZero(departureTimeReturn.getMinutes())}:00`,
    returnLocalArrivalTime: `${addZero(arrivalTimeReturn.getHours())}:${addZero(
      arrivalTimeReturn.getMinutes()
    )}:00`,
    price: flightDetail.price
  };

  addFlightToDB(flightDetailsObject);
}

function addFlightToDB(flightObject) {
  console.log("add flight to DB running");
  return fetch("/api/flights", {
    method: "post",
    body: JSON.stringify({ flightObject }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => console.log("Response data", data));
}

function FlightResults({ flightResults, isAPILoading, startDate, endDate }) {
  if (isAPILoading) {
    return (
      <div className="flightsresults__loading container">
        <div className="loader">Results Loading&hellip;</div>
      </div>
    );
  }
  if (!flightResults) {
    return null;
  }
  if (flightResults.length === 0) {
    return (
      <div>
        <p>No Flights for those days/aiports, please search again</p>
      </div>
    );
  }

  return (
    <div>
      <header className="flightsresults__header">
        <h1 className="flightsresults__title container">Select flights</h1>
      </header>

      {flightResults.map(function(flightDetail) {
        let arrivalTimeUTCOutbound = flightDetail.route[0].aTime;
        let departureTimeUTCOutbound = flightDetail.route[0].dTime;
        let arrivalTimeOutbound = new Date(arrivalTimeUTCOutbound * 1000);
        let departureTimeOutbound = new Date(departureTimeUTCOutbound * 1000);

        let arrivalTimeUTCReturn = flightDetail.route[1].aTime;
        let departureTimeUTCReturn = flightDetail.route[1].dTime;
        let arrivalTimeReturn = new Date(arrivalTimeUTCReturn * 1000);
        let departureTimeReturn = new Date(departureTimeUTCReturn * 1000);

        return (
          <article className="results">
            <div className="results__display container">
              <table className="results__table">
                <tbody>
                  <tr className="results__outbound">
                    <td>{`${addZero(
                      departureTimeOutbound.getHours()
                    )}:${addZero(departureTimeOutbound.getMinutes())}`}</td>
                    <td>
                      <i className="fas fa-plane" />
                    </td>
                    <td>
                      {" "}
                      {`${addZero(arrivalTimeOutbound.getHours())}:${addZero(
                        arrivalTimeOutbound.getMinutes()
                      )}`}
                    </td>
                  </tr>

                  <tr className="results__details details--out">
                    <td>{flightDetail.route[0].flyFrom}</td>
                    <td>Emirates</td>
                    <td>{flightDetail.route[0].flyTo}</td>
                  </tr>

                  <tr className="results__return">
                    <td>
                      {`${addZero(departureTimeReturn.getHours())}:${addZero(
                        departureTimeReturn.getMinutes()
                      )}`}
                    </td>
                    <td>
                      <i className="fas fa-plane" />
                    </td>
                    <td>
                      {`${addZero(arrivalTimeReturn.getHours())}:${addZero(
                        arrivalTimeReturn.getMinutes()
                      )}`}
                    </td>
                  </tr>

                  <tr className="results__details details--return">
                    <td>{flightDetail.route[1].flyFrom}</td>
                    <td>Emirates</td>
                    <td>{flightDetail.route[1].flyTo}</td>
                  </tr>
                </tbody>
              </table>

              <div className="results__book">
                £{flightDetail.price}
                <button
                  type="button"
                  className="results__btn"
                  onClick={() =>
                    handleClick(
                      flightDetail,
                        tripId,
                      departureTimeReturn,
                      arrivalTimeReturn,
                      arrivalTimeOutbound,
                      departureTimeOutbound,
                      startDate,
                      endDate
                    )
                  }
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>

            {/* <p>
              Outbound: {flightDetail.route[0].cityFrom} -{" "}
              {flightDetail.route[0].flyFrom} to {flightDetail.route[0].cityTo}{" "}
              - {flightDetail.route[0].flyTo}
            </p>
            <p>
              Departure Time (local time):{" "}
              {`${addZero(departureTimeOutbound.getHours())}:${addZero(
                departureTimeOutbound.getMinutes()
              )}:00`}
            </p>
            <p>
              Arrival Time (local time):{" "}
              {`${addZero(arrivalTimeOutbound.getHours())}:${addZero(
                arrivalTimeOutbound.getMinutes()
              )}:00`}
            </p>
            <p>
              Return: {flightDetail.route[1].cityFrom} -{" "}
              {flightDetail.route[1].flyFrom} to {flightDetail.route[1].cityTo}{" "}
              - {flightDetail.route[1].flyTo}
            </p>
            <p>
              Departure Time (local time):{" "}
              {`${addZero(departureTimeReturn.getHours())}:${addZero(
                departureTimeReturn.getMinutes()
              )}:00`}
            </p>
            <p>
              Arrival Time (local time):{" "}
              {`${addZero(arrivalTimeReturn.getHours())}:${addZero(
                arrivalTimeReturn.getMinutes()
              )}:00`}
            </p>
            <h2>Total Price: £{flightDetail.price}</h2>
            <button
              type="button"
              onClick={() =>
                handleClick(
                  flightDetail,
                  departureTimeReturn,
                  arrivalTimeReturn,
                  arrivalTimeOutbound,
                  departureTimeOutbound,
                  startDate,
                  endDate
                )
              }
            >
              Pick this Flight!
            </button> */}
          </article>
        );
      })}
    </div>
  );
}
export default FlightResults;
