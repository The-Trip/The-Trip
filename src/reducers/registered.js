function registered(state = null, action) {
  switch (action.type) {
    case "SET_REGISTERED":
      return action.registered;
    default:
      return state;
  }
}

export default registered;
