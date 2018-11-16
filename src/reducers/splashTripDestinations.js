function setCustomerDestinations(state = [], action) {
  switch (action.type) {
    case "SET_SPLASH_IMAGE":
      return action.destinations;
    default:
      return state;
  }
}

export default setCustomerDestinations;
