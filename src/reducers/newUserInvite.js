function newUserInvite(state = null, action) {
  switch (action.type) {
    case "SET_NEW_USER_INVITE":
      return action.isTrue;
    case "CLEAR_REGISTRATION_STATES":
      return false;
    default:
      return state;
  }
}

export default newUserInvite;
