import { fetchSuggestionsFromDB } from "./phil.js";

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

export function setNewUserTrip(isTrue) {
  return {
    type: "SET_NEW_USER_TRIP",
    isTrue
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

export function fetchCommentsFromDB(tripId) {
  return function(dispatch) {
    fetch(`/api/trip/${tripId}/comments`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveComments(result));
      })
      .catch(console.error);
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

export function fetchCustomersDestinationsFromDB() {
  return function(dispatch) {
    fetch(`/api/custlocations`)
      .then(response => response.json())
      .then(destinations => {
        dispatch(setCustomerDestinations(destinations));
      })
      .catch(console.error);
  };
}

export function setCustomerDestinations(destinations) {
  return {
    type: "SET_SPLASH_IMAGE",
    destinations
  };
}

export function addUserToDB() {
  console.log("start of addUserToDB action");
  return function(dispatch, getState) {
    return fetch("/api/customer", {
      method: "post",
      body: JSON.stringify(getState().registerForm),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(userData => {
        console.log(userData);
        console.log("register");
        dispatch(setRegistered(true));
      });
  };
}

export function addLike(suggestionId, tripId) {
  return function(dispatch, getState) {
    fetch(`/api/addlike`, {
      method: "post",
      body: JSON.stringify({
        suggestionId: suggestionId,
        customerId: getState().user.id,
        tripId: tripId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(tripLikes => {
        dispatch(setLikes(tripLikes));
      })
      .catch(console.error);
  };
}

export function removeLike(suggestionId, tripId) {
  return function(dispatch, getState) {
    fetch(`/api/removelike`, {
      method: "post",
      body: JSON.stringify({
        suggestionId: suggestionId,
        customerId: getState().user.id,
        tripId: tripId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(tripLikes => {
        dispatch(setLikes(tripLikes));
      })
      .catch(console.error);
  };
}

export function likeFetch(tripId) {
  console.log("likefetch");
  return function(dispatch, getState) {
    fetch(`/api/${tripId}/likefetch`)
      .then(response => response.json())
      .then(tripLikes => {
        console.log(tripLikes);
        dispatch(setLikes(tripLikes));
      })
      .catch(console.error);
  };
}

export function setLikes(tripLikes) {
  return {
    type: "SET_TRIP_LIKES",
    tripLikes
  };
}

export function addFavourite(suggestionId, tripId) {
  return function(dispatch, getState) {
    fetch(`/api/add-favourite`, {
      method: "post",
      body: JSON.stringify({
        suggestionId: suggestionId,
        customerId: getState().user.id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        // fetchSuggestions includes favourites
        fetchSuggestionsFromDB(tripId);
      })
      .catch(console.error);
  };
}

export function removeFavourite(suggestionId, tripId) {
  return function(dispatch, getState) {
    fetch(`/api/remove-favourite`, {
      method: "post",
      body: JSON.stringify({
        suggestionId: suggestionId,
        customerId: getState().user.id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        // fetchSuggestions includes favourites
        fetchSuggestionsFromDB(tripId);
      })
      .catch(console.error);
  };
}
