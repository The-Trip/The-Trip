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
            body: JSON.stringify(getState().tripForm),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
                dispatch(createTrip(data));
                dispatch(googleFetch(location))
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


export function fetchQuestions(){
    return function(dispatch){
        return fetch('https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple')
            .then(response => response.json())
            .then(data => {
                dispatch(receiveQuestions(data));
            })
    }
}

export function receiveQuestions(APIResult) {
    return {
        type: 'RECEIVE_QUESTIONS',
        fullQuestionList: APIResult.results
    }
}


export function googleFetch(location) {
        console.log('google fetch')
        return function(dispatch, getState){
        return fetch("/api/google", {
                method: "get",
                body: JSON.stringify(getState().location),
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
    