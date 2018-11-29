import {
  fetchCommentsFromDB,
  addNewTrip,
  setSelectedPlace,
  storeGoogleFetch,
  likeFetch
} from "./chris.js";

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
          dispatch(setSelectedPlace(null));
          dispatch(storeGoogleFetch([]));
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
          dispatch(fetchCommentsFromDB(tripId));
        })
    );
  };
}

export function addIndivCommentToDB(suggestionId, tripId) {
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

export function loginUser() {
  return function(dispatch, getState) {
    console.log("login user");
    console.log(getState().loginForm);
    return fetch("/api/login", {
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
      .then(user => {
        if (!user) {
          console.log(user);
          console.log("incorrect password");
          dispatch(setLoginMessage("Incorrect username or password"));
          return;
        }
        dispatch(setUser({ id: null }));
        dispatch(setUser(user));
        if (getState().setNewUserTrip === true) {
          console.log("add new trip should happen next");
          dispatch(addNewTrip());
        }
        if (getState().newUserInvite === true) {
          console.log("add new invite ....164");
          dispatch(checkInviteCode());
        }
        console.log("clear registration next");
        dispatch(clearRegistrationStates());
      })
      .catch("catch login" + console.error.QueryResultError);
  };
}

export function checkInviteCode() {
  return function(dispatch, getState) {
    console.log("checkInvite");
    console.log(getState().inviteCodeForm);
    return fetch("/api/invite", {
      method: "post",
      body: JSON.stringify({
        inviteCode: getState().inviteCodeForm.inviteCode
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response.json);
        if (response.status === 401) {
          console.log("not logged in - check invite");
          dispatch(setNewUserInvite(true));
        }
        return response.json();
      })
      .then(tripId => {
        console.log(tripId);
        dispatch(setAddedTripId({ id: tripId }));
      });
  };
}

export function setNewUserInvite(isTrue) {
  return {
    type: "SET_NEW_USER_INVITE",
    isTrue
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

export function setLoginMessage(message) {
  return {
    type: "SET_LOGIN_MESSAGE",
    message
  };
}

export function setRegistered(trueOrNull) {
  return {
    type: "SET_REGISTERED",
    registered: trueOrNull
  };
}

export function clearRegistrationStates() {
  return {
    type: "CLEAR_REGISTRATION_STATES"
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
        dispatch(likeFetch(tripId));
      })
      .catch(function(error) {});
  };
}

export function filterOutFavsFetch(tripId) {
  console.log("fav filter");
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion/favfilter`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(likeFetch(tripId));
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
