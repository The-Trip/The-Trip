function stylesSwitchSet(
  state = {
    navActive: false,
    tabOpen: false
  },
  action
) {
  switch (action.type) {
    case "SET_NAV_ACTIVE":
      return Object.assign({}, state, { navActive: true });

    case "SET_TAB_OPEN":
      return Object.assign({}, state, { tabOpen: true });

    default:
      return state;
  }
}

export default stylesSwitchSet;
