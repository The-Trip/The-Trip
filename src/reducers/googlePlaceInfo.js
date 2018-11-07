function googlePlaceInfo(state = {}, action){
    switch (action.type) {
        case 'STORE_GOOGLE':
            return action.data;
        default:
            return state
    }
}

export default googlePlaceInfo;
