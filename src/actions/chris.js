export function setTripState(name, value ) {
    return {
        type: 'SET_TRIP_STATE',
        name,
        value
    }
}

export function addNewTrip(){
   
    console.log('fetch')
    return function(dispatch, getState){
    return fetch("/api/trip", {
            method: "post",
            body: JSON.stringify({trip:getState().tripForm,user:getState().user}),
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