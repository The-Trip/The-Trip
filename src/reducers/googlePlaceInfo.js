function googlePlaceInfo(state = [], action) {
  switch (action.type) {
    case "STORE_GOOGLE":
      return action.destinationInfo;
    case "CLEAR_SUGGESTION_INPUT": {
      return [];
    }
    default:
      return state;
  }
}

export default googlePlaceInfo;
