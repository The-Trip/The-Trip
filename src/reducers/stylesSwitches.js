function stylesSwitchSet(
  state = {
    navActive: false,
    clicked: false
  },
  action
) {
  switch (action.type) {
    case "SET_NAV_ACTIVE":
      return Object.assign({}, state, { navActive: true });

    case "ADD_CLICKED_CLASS":
      return Object.assign({}, state, { clicked: true });

    case "REMOVE_CLICKED_CLASS":
      return Object.assign({}, state, { clicked: false });

    default:
      return state;
  }
}

export default stylesSwitchSet;
