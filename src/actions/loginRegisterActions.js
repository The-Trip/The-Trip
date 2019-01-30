import { addNewTrip, setAddedTripId, apiCall } from "./tripCreateActions.js";

// REGISTER USER
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
        dispatch(setRegistered(true));
      });
  };
}

export function setRegistered(trueOrNull) {
  return {
    type: "SET_REGISTERED",
    registered: trueOrNull
  };
}

export function registerToState(name, value) {
  return {
    type: "SET_REGISTER_INPUT",
    name,
    value
  };
}

// flusher function
export function clearRegistrationStates() {
  return {
    type: "CLEAR_REGISTRATION_STATES"
  };
}

// LOGIN USER
export function loginUser() {
  return function(dispatch, getState) {
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
          dispatch(setLoginMessage("Incorrect username or password"));
          return;
        }
        dispatch(setUser({ id: null }));
        dispatch(setUser(user));
        if (getState().setNewUserTrip === true) {
          dispatch(addNewTrip());
        }
        if (getState().newUserInvite === true) {
          dispatch(checkInviteCode());
        }
        dispatch(clearRegistrationStates());
      })
      .catch("catch login" + console.error.QueryResultError);
  };
}

export function setLoginMessage(message) {
  return {
    type: "SET_LOGIN_MESSAGE",
    message
  };
}

export function setUser(user) {
  return {
    type: "SET_USER",
    user: user
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

export function loginToState(name, value) {
  return {
    type: "SET_LOGIN_INPUT",
    name,
    value
  };
}

// INVITES
export function checkInviteCode() {
  return function(dispatch, getState) {
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
        if (response.status === 401) {
          dispatch(setNewUserInvite(true));
        }
        return response.json();
      })
      .then(tripId => {
        dispatch(setAddedTripId({ id: tripId }));
      });
  };
}

export function inviteCodeToState(name, value) {
  return {
    type: "SET_INVITE_INPUT",
    name,
    value
  };
}

export function setNewUserInvite(isTrue) {
  return {
    type: "SET_NEW_USER_INVITE",
    isTrue
  };
}
