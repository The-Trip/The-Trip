function suggestions(state = [], action) {
  switch (action.type) {
    case "RECEIVE_SUGGESTIONS":
      return action.suggestions;
    default:
      return state;
  }
}

export default suggestions;
