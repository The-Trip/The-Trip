function selectedPlace(state = null, action){
    switch (action.type) {
        case 'STORE_PLACE':
            return action.selectedPlaceID
        default:
            return state
    }
}

export default selectedPlace;
