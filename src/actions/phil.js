import { fetchCommentsFromDB } from "./chris.js";

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

export function inviteCodeToState(name, value) {
  return {
    type: "SET_INVITE_INPUT",
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

export function addIndivCommentToDB(suggestionId, tripId) {
  console.log(suggestionId, tripId);
  return function(dispatch, getState) {
    return (
      fetch("/api/comment", {
        method: "post",
        body: JSON.stringify({
          suggest_id: suggestionId.id,
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
          dispatch(fetchCommentsFromDB(tripId));
        })
    );
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
        dispatch(loginUser(userData));
      });
  };
}

export function loginUser() {
  return function(dispatch, getState) {
    console.log("login user");
    console.log(getState().loginForm);
    return (
      fetch("/api/login", {
        method: "post",
        body: JSON.stringify({
          username: getState().loginForm.loginEmail,
          password: getState().loginForm.loginPassword
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        // TODO - Create response in server.js
        .then(user => {
          dispatch(setUser(user));
        })
    );
  };
}

export function checkInviteCode() {
  return function(dispatch, getState) {
    console.log("checkInvite");
    console.log(getState().inviteCodeForm);
    return (
      fetch("/api/invite", {
        method: "post",
        body: JSON.stringify({
          inviteCode: getState().inviteCodeForm.inviteCode
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        // TODO - Create response in server.js
        .then(tripId => {
          dispatch(setAddedTripId(tripId));
        })
    );
  };
}

export function checkLogin() {
  return function(dispatch, getState) {
    apiCall(`/checklogin/`)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(function(error) {});
  };
}

export function setUser(user) {
  return {
    type: "SET_USER",
    user: user
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

function apiCall(path) {
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

export function fetchSuggestionsFromDB(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
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

export function suggestionInputClearState() {
  console.log("suggestion input clear action");
  return {
    type: "CLEAR_SUGGESTION_INPUT"
  };
}

export function setAddedTripId(tripId) {
  return {
    type: "SET_ADDED_TRIP_ID",
    tripId
  };
}
