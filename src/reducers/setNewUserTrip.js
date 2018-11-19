function setNewUserTrip(state = false, action) {
  switch (action.type) {
    case "SET_NEW_USER_TRIP":
      return action.isTrue;
    case "CLEAR_REGISTRATION_STATES":
      return false;
    default:
      return state;
  }
}

export default setNewUserTrip;
