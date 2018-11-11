function setAPIFetchResults(state = [], action){
    switch (action.type) {
        case 'RECEIVE_QUESTIONS':
            return action.fullQuestionList;
        default:
            return state
    }
}

export default setAPIFetchResults;