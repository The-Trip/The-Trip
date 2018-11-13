import React from 'react'

function addZero(i){
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function handleClick(flightDetail,departureTimeReturn,arrivalTimeReturn,arrivalTimeOutbound,departureTimeOutbound,startDate,endDate){

    let flightDetailsObject = {
        flightCombinationID: flightDetail.route[0].combination_id,
        outboundFlightDate: startDate.toISOString(),
        returnFlightDate: endDate.toISOString(),
        cityFrom: flightDetail.route[0].cityFrom,
        cityTo: flightDetail.route[0].cityTo,
        airportFrom: flightDetail.route[0].flyFrom,
        airportTo: flightDetail.route[0].flyTo,
        outboundLocalArrivalTime: `${addZero(arrivalTimeOutbound.getHours())}:${addZero(arrivalTimeOutbound.getMinutes())}:00`,
        outboundLocalDepartureTime: `${addZero(departureTimeOutbound.getHours())}:${addZero(departureTimeOutbound.getMinutes())}:00`,
        returnLocalDepartureTime: `${addZero(departureTimeReturn.getHours())}:${addZero(departureTimeReturn.getMinutes())}:00`,
        returnLocalArrivalTime: `${addZero(arrivalTimeReturn.getHours())}:${addZero(arrivalTimeReturn.getMinutes())}:00`,
        price: flightDetail.price
    };

    addFlightToDB(flightDetailsObject);
}

function addFlightToDB(flightObject) {
        console.log("add flight to DB running");
        return (
            fetch("/api/flights", {
                method: "post",
                body: JSON.stringify({flightObject}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => console.log("Response data", data))
        );
}

function FlightResults({flightResults, isAPILoading, startDate, endDate}){


        if (isAPILoading){
            return (<div><p>Results Loading...</p></div>)
        }
        if (!flightResults){
            return null
        }
        if (flightResults.length===0){
            return(<div><p>No Flights for those days/aiports, please search again</p></div>)
        }

        return   (
            <div>
                {
                    flightResults.map(function(flightDetail){
                        let arrivalTimeUTCOutbound = flightDetail.route[0].aTime;
                        let departureTimeUTCOutbound = flightDetail.route[0].dTime;
                        let arrivalTimeOutbound = new Date(arrivalTimeUTCOutbound*1000);
                        let departureTimeOutbound = new Date(departureTimeUTCOutbound*1000);

                        let arrivalTimeUTCReturn = flightDetail.route[1].aTime;
                        let departureTimeUTCReturn = flightDetail.route[1].dTime;
                        let arrivalTimeReturn = new Date(arrivalTimeUTCReturn*1000);
                        let departureTimeReturn = new Date(departureTimeUTCReturn*1000);

                        return (
                            <div>
                                <p>Outbound: {flightDetail.route[0].cityFrom} - {flightDetail.route[0].flyFrom} to {flightDetail.route[0].cityTo} - {flightDetail.route[0].flyTo}</p>
                                <p>Departure Time (local time): {`${addZero(departureTimeOutbound.getHours())}:${addZero(departureTimeOutbound.getMinutes())}:00`}</p>
                                <p>Arrival Time (local time): {`${addZero(arrivalTimeOutbound.getHours())}:${addZero(arrivalTimeOutbound.getMinutes())}:00`}</p>
                                <p>Return: {flightDetail.route[1].cityFrom} - {flightDetail.route[1].flyFrom} to {flightDetail.route[1].cityTo} - {flightDetail.route[1].flyTo}</p>
                                <p>Departure Time (local time): {`${addZero(departureTimeReturn.getHours())}:${addZero(departureTimeReturn.getMinutes())}:00`}</p>
                                <p>Arrival Time (local time): {`${addZero(arrivalTimeReturn.getHours())}:${addZero(arrivalTimeReturn.getMinutes())}:00`}</p>
                                <h2>Total Price: £{flightDetail.price}</h2>
                                <button type="button"
                                        onClick={() => handleClick(
                                            flightDetail,
                                            departureTimeReturn,
                                            arrivalTimeReturn,
                                            arrivalTimeOutbound,
                                            departureTimeOutbound,
                                            startDate,
                                            endDate)}>
                                    Pick this Flight!</button>
                            </div>
                        )
                    })
                }
            </div>);
}
export default FlightResults