function comments(state = [], action){
    switch (action.type) {
        case 'SET_COMMENT_INPUT':
            return action.value;
        default:
            return state
    }
}

export default comments;