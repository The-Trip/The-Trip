export function suggestionInputToState(name, value ) {
    return {
        type: 'SET_SUGGESTION_INPUT',
        name,
        value
    }
}

export function addSuggestionToDB(){
   
    console.log('fetch')
    return function(dispatch, getState){
    return fetch("/api/suggestion", {
            method: "post",
            body: JSON.stringify(getState().tripForm),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
                dispatch(suggestionsFromDB(data));
            })
    }
}


export function suggestionsFromDB(data) {
    return {
        type: 'RECEIVE_SUGGESTIONS',
        suggestions: data
    }
}

