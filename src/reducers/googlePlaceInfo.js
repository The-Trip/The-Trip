function googlePlaceInfo(state = [], action){
    switch (action.type) {
        case 'STORE_GOOGLE':
        console.log(action.destinationInfo)
            return action.destinationInfo;
        default:
            return state
    }
}

export default googlePlaceInfo;
