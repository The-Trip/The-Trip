function user(state = {id:42,loggedIn:true}, action){
    switch (action.type) {
        case 'SET_USER':
            return action.suggestions;
        default:
            return state
    }
}

export default user;