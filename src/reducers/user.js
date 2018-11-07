function user(state = {id:3,name:'bob',loggedIn:true}, action){
    switch (action.type) {
        case 'SET_USER':
            return action.suggestions;
        default:
            return state
    }
}

export default user;