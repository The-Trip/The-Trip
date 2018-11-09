import { googleFetch} from '../actions/chris';


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
            body: JSON.stringify({suggestion:getState().suggestionForm,user:getState().user.id,trip:getState().trip.id}),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
                dispatch(suggestionsFromDB(data));
                dispatch(googleFetch());
            })
    }
}


export function suggestionsFromDB(data) {
    return {
        type: 'RECEIVE_SUGGESTIONS',
        suggestions: data
    }
}

