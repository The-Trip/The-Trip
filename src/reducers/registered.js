function registered(state = null, action) {
  switch (action.type) {
    case "SET_REGISTERED":
      return action.registered;
    case "CLEAR_REGISTRATION_STATES":
      return null;
    default:
      return state;
  }
}

export default registered;
