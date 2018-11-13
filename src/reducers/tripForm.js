function tripForm(state = {}, action) {
  switch (action.type) {
    case "SET_TRIP_STATE": {
      const formObj = Object.assign({}, state, { [action.name]: action.value });
      return formObj;
    }
    default:
      return state;
  }
}

export default tripForm;
