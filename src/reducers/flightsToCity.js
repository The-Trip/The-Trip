function flightsToCity(state = "", action){
    switch (action.type) {
        case 'TO_CITY':
            return action.city;
        default:
            return state
    }
}

export default flightsToCity