export function setTripState(name, value) {
  return {
    type: "SET_TRIP_STATE",
    name,
    value
  };
}

export function addNewTrip() {
  console.log("add new trip");
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
      .then(response => {
        console.log(response);
        if (response.status === 401) {
          console.log("not logged in - add new trip");
          dispatch(setNewUserTrip(true));
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        dispatch(setAddedTripId(data));
      });
  };
}

export function setAddedTripId(tripId) {
  return {
    type: "SET_ADDED_TRIP_ID",
    tripId
  };
}

export function setNewUserTrip(isTrue) {
  return {
    type: "SET_NEW_USER_TRIP",
    isTrue
  };
}

export function apiCall(path) {
  return fetch(`/api${path}`, { credentials: "same-origin" }).then(res =>
    res.json()
  );
}

export function fetchTripsFromDB(userId) {
  return function(dispatch, getState) {
    apiCall(`/user/trip`)
      .then(result => {
        dispatch(receiveTrips(result));
      })
      .catch(function(error) {});
  };
}

export function receiveTrips(trips) {
  return {
    type: "RECEIVE_TRIPS",
    trips: trips
  };
}
