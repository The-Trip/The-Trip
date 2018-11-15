function suggestionsForm(state = {}, action) {
  switch (action.type) {
    case "SET_SUGGESTION_INPUT": {
      const formObj = Object.assign({}, state, { [action.name]: action.value });
      return formObj;
    }
    case "CLEAR_SUGGESTION_INPUT": {
      return [];
    }
    default:
      return state;
  }
}

export default suggestionsForm;
