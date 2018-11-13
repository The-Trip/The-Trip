function isAPILoading(state = false, action){
    switch (action.type) {
        case 'IS_LOADING':
            return !state;
        default:
            return state
    }
}

export default isAPILoading;