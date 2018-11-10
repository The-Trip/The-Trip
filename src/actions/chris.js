export function setTripState(name, value ) {
    return {
        type: 'SET_TRIP_STATE',
        name,
        value
    }
}

export function addNewTrip(){
   
    console.log('post new trip')
    return function(dispatch, getState){
    return fetch("/api/trip", {
            method: "post",
            body: JSON.stringify({trip:getState().tripForm, user:getState().user}),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
                dispatch(createTrip(data));
            })
    }
}


export function createTrip(tripName, tripDestination ) {
    return {
        type: 'CREATE_TRIP',
        tripName: tripName,
        tripDestination: tripDestination
    }
}


export function googleFetch() {
        return function(dispatch, getState){
            const place = getState().suggestionForm.place
            const location = getState().tripForm.destination
                fetch("/api/google", {
                method: "post",
                body: JSON.stringify({place}, {location}),
                headers: {
                  "Content-Type": "application/json"
                }
              })
                .then(response => response.json())
                .then(data => {
                    dispatch(storeGoogleFetch(data));
                })
        }
    }


    export function storeGoogleFetch(data) {
        return {
            type: 'STORE_GOOGLE',
            destinationInfo: data
            
        }
    }
    
    export function setSelectedPlace(place) {
        return {
            type: 'STORE_PLACE',
           selectedPlaceID: place
            
        }
    }