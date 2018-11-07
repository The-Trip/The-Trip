function suggestionsForm( state = {}, action ){
    switch(action.type) {
      case 'SET_SUGGESTION_INPUT':
      const formObj = Object.assign({}, state, {[action.name]: action.value})
      console.log(state)
      return formObj
        
      default:
        return state;
    }
  }
  
  export default suggestionsForm;
  