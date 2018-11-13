import { fetchCommentsFromDB } from "./chris";

export function suggestionInputToState(name, value) {
  return {
    type: "SET_SUGGESTION_INPUT",
    name,
    value
  };
}

export function commentInputToState(name, value) {
  return {
    type: "SET_COMMENT_INPUT",
    name,
    value
  };
}

export function loginToState(name, value) {
  return {
    type: "SET_LOGIN_INPUT",
    name,
    value
  };
}

export function registerToState(name, value) {
  return {
    type: "SET_REGISTER_INPUT",
    name,
    value
  };
}

export function addSuggestionToDB(place, tripId) {
  return function(dispatch, getState) {
    return (
      fetch("/api/suggestion", {
        method: "post",
        body: JSON.stringify({
          place: place,
          user: getState().user.id,
          trip: tripId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        // TODO - Create response in server.js
        .then(id => {
          console.log(id);
          dispatch(addCommentToDB(id, tripId));
        })
    );
  };
}

export function addCommentToDB(id, tripId) {
  return function(dispatch, getState) {
    return (
      fetch("/api/comment", {
        method: "post",
        body: JSON.stringify({
          suggest_id: id.suggestionID,
          cust_id: getState().user.id,
          comment: getState().suggestionComment
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        // TODO - Create response in server.js
        .then(() => {
          dispatch(fetchSuggestionsFromDB(tripId));
        })
    );
  };
}

export function addUserToDB() {
  return function(dispatch, getState) {
    return fetch("/api/suggestion", {
      method: "post",
      body: JSON.stringify(getState().registerForm),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(suggestionsFromDB(data));
      });
  };
}

export function suggestionsFromDB(data) {
  return {
    type: "RECEIVE_SUGGESTIONS",
    suggestions: data
  };
}

export function setView(view) {
  return {
    type: "SET_VIEW",
    view: view
  };
}

export function fetchTripsFromDB(userId) {
  return function(dispatch, getState) {
    fetch(`/api/user/${userId}/trip`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveTrips(result));
      })
      .catch(function(error) {});
  };
}

export function fetchSuggestionsFromDB(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(fetchCommentsFromDB());
        console.log("calling!");
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

export function receiveSuggestions(suggestions) {
  return {
    type: "RECEIVE_SUGGESTIONS",
    suggestions
  };
}
