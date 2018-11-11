function view(state = "home", action) {
  switch (action.type) {
    case "SET_VIEW":
      return action.view;
    default:
      return state;
  }
}

export default view;
