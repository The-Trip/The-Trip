function trips(state = [], action){
    console.log('trips reducer')
    switch (action.type) {
        case 'RECEIVE_TRIPS':
            return action.trips;
        default:
            return state
    }
}

export default trips;