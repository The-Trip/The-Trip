
export function unsplashFetch(tripId) {
    return function(dispatch, getState){
        const location = getState().trips.find(trip => trip.id == tripId).destination
        const api = process.env.UNSPLASH_API
        const photoUrl = `https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=${api}`
            fetch(photoUrl)
            .then(response => response.json())
            .then(data => {
                dispatch(storeUnplashFetch(data));
            })
    }
}

export function storeUnsplashFetch(data) {
    return {
        type: 'RECEIVE_UNSPLASH_IMAGES',
        destinationImage: data
    }
}


// this.setState({images: content.results})
// this.setState({currentImage: content.results[0]})










