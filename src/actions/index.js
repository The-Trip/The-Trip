export function fetchQuestions(){
    return function(dispatch){
        return fetch('https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple')
            .then(response => response.json())
            .then(data => {
                dispatch(receiveQuestions(data));
            })
    }
}

export function receiveQuestions(APIResult) {
    return {
        type: 'RECEIVE_QUESTIONS',
        fullQuestionList: APIResult.results
    }
}