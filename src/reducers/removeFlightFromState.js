function receiveFlights(state = [], action) {
    switch (action.type) {
        case "FLIGHTS_FROM_DB":
            return action.flights;
        default:
            return state;
    }
}

export default receiveFlights;
