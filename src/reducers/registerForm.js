function registerForm(state = {}, action) {
  switch (action.type) {
    case "SET_REGISTER_INPUT": {
      const formObj = Object.assign({}, state, { [action.name]: action.value });
      return formObj;
    }
    default:
      return state;
  }
}

export default registerForm;
