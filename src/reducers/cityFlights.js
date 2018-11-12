function cityFlights(state = "", action){
    switch (action.type) {
        case 'TO_CITY':
            return action.city;
        case 'FROM_CITY':
            return action.city;
        default:
            return state
    }
}

export default cityFlights;