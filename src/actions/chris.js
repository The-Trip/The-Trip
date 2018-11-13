export function setTripState(name, value) {
  return {
    type: "SET_TRIP_STATE",
    name,
    value
  };
}

export function addNewTrip() {
  return function(dispatch, getState) {
    return fetch("/api/trip", {
      method: "post",
      body: JSON.stringify({
        trip: getState().tripForm,
        user: getState().user
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setAddedTripId(data));
      });
  };
}

export function googleFetch(tripId) {
  return function(dispatch, getState) {
    const place = getState().suggestionForm.place;
    const location = getState().trips.find(trip => trip.id == tripId)
      .destination;
    fetch("/api/google", {
      method: "post",
      body: JSON.stringify({ place, location }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(storeGoogleFetch(data));
      })
      .catch(console.error);
  };
}

export function storeGoogleFetch(data) {
  return {
    type: "STORE_GOOGLE",
    destinationInfo: data
  };
}

export function setSelectedPlace(place) {
  return {
    type: "STORE_PLACE",
    selectedPlaceID: place
  };
}

export function fetchCommentsFromDB(suggestId) {
  return function(dispatch) {
    fetch(`/api/trip/${suggestId}/comments`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveComments(result));
      })
      .catch(function(error) {});
  };
}

export function receiveComments(results) {
  return {
    type: "STORE_COMMENTS",
    comments: results
  };
}

export function setAddedTripId(tripId) {
  return {
    type: "SET_ADDED_TRIP_ID",
    tripId
  };
}
