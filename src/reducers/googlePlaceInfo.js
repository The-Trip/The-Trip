function googlePlaceInfo(state = [], action){
    switch (action.type) {
        case 'STORE_GOOGLE':
        return action.destinationInfo;
        default:
            return state
    }
}

export default googlePlaceInfo;
