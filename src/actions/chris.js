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
        console.log('google fetch')
        return function(dispatch, getState){
            // const info = getState().tripForm.destination
            const place = getState().suggestionForm.place
            const location = getState().tripForm.destination
            console.log(place, location);
                fetch("/api/google", {
                method: "post",
                body: JSON.stringify({place}, {location}),
                headers: {
                  "Content-Type": "application/json"
                }
              })
                .then(response => response.json())
                .then(data => {
                    console.log('google info fetch', data)
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
        console.log("click")
        return {
            type: 'STORE_PLACE',
           selectedPlaceInfo: place
            
        }
    }