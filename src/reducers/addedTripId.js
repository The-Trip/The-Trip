function addedTripId(state = null, action) {
  switch (action.type) {
    case "SET_ADDED_TRIP_ID":
      return action.tripId;
    default:
      return state;
  }
}

export default addedTripId;
