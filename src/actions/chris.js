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
            body: JSON.stringify(getState().tripForm),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
                dispatch(createTrip(data));
                dispatch(googleFetch(location));
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


export function googleFetch(location) {
        console.log('google fetch')
        return function(dispatch, getState){
        return fetch("/api/google", {
                method: "get",
                body: JSON.stringify(getState().tripForm.destination),
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
    