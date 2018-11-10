function unsplashImages(state = [], action){
    // this returns undefined
    console.log(action.images);
    switch (action.type) {
        case 'RECEIVE_UNSPLASH_IMAGES':
        return action.images;
        default:
            return state
    }
}

export default unsplashImages;