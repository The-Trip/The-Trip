import React from 'react'

function addZero(i){
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function FlightResults({flightResults, isAPILoading}){


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
                            </div>
                        )
                    })
                }
            </div>);
}
export default FlightResults