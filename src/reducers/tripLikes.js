function tripLikes(state = {}, action) {
  switch (action.type) {
    case "SET_TRIP_LIKES":
      return action.tripLikes;
    default:
      return state;
  }
}

export default tripLikes;
