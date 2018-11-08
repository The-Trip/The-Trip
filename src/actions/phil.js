export function suggestionInputToState(name, value ) {
    return {
        type: 'SET_SUGGESTION_INPUT',
        name,
        value
    }
}

export function addSuggestionToDB(){
    console.log('fetch')
    return function(dispatch, getState){
    return fetch("/api/suggestion", {
            method: "post",
            body: JSON.stringify({suggestion:getState().suggestionForm,user:getState().user.id,trip:getState().trip.id}),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
                dispatch(suggestionsFromDB(data));
            })
    }
}


export function suggestionsFromDB(data) {
    return {
        type: 'RECEIVE_SUGGESTIONS',
        suggestions: data
    }
}

export function setView(view) {
    return {
        type: 'SET_VIEW',
        view: view
    }
}

export function fetchTripsFromDB(userId){
    return function(dispatch, getState){
        console.log(userId)
      fetch(`/api/user/${userId}/trip`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch(receiveTrips(result))
      })
      .catch(function(error) {
        console.log(error)
    });
    }
  }

  export function fetchSuggestionsFromDB(tripId){
    console.log('fetchSuggestions')
    return function(dispatch, getState){
      fetch(`/api/trip/${tripId}/suggestion`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch(receiveSuggestions(result))
      })
      .catch(function(error) {
        console.log(error)
    });
    }
  }

  export function receiveTrips(trips) {
    return {
        type: 'RECEIVE_TRIPS',
        trips: trips
    }
}

export function receiveSuggestions(suggestions) {
    return {
        type: 'RECEIVE_SUGGESTIONS',
        suggestions
    }
}
