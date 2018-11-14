function loginForm(state = {}, action) {
  switch (action.type) {
    case "SET_LOGIN_INPUT": {
      const formObj = Object.assign({}, state, { [action.name]: action.value });
      return formObj;
    }
    default:
      return state;
  }
}

export default loginForm;
