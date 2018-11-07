function trip(state = {id:42,place:'New York',description:'Girls hit the town in NYC'}, action){
    switch (action.type) {
        case 'RECEIVE_TRIP':
            return action.suggestions;
        default:
            return state
    }
}

export default trip;