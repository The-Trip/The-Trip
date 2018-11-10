function unsplashImages(state = [], action){
    switch (action.type) {
        case 'RECEIVE_UNSPLASH_IMAGES':
        return action.locationImages;
        default:
            return state
    }
}

export default unsplashImages;
