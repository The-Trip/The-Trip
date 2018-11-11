function unsplashImage(state = {}, action){
    switch (action.type) {
        case 'STORE_UNSPLASH_IMAGE_URLS':
        console.log(action.image)
        return action.image;
        default:
            return state
    }
}

export default unsplashImage;