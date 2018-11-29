function loginMessage(state = null, action) {
  switch (action.type) {
    case "SET_LOGIN_MESSAGE":
      return action.message;
    case "CLEAR_REGISTRATION_STATES":
      return null;
    default:
      return state;
  }
}

export default loginMessage;
