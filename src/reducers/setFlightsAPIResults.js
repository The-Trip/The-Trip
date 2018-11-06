function setFlightsAPIResults(state = [], action){
    switch (action.type) {
        case 'RECEIVE_FLIGHTS':
            return action.flightList;
        default:
            return state
    }
}

export default setFlightsAPIResults;