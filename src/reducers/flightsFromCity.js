function flightsFromCity(state = "", action){
    switch (action.type) {
        case 'FROM_CITY':
            return action.city;
        default:
            return state
    }
}

export default flightsFromCity