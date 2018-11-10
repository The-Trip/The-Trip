
export function fetchImagesFromUnsplash() {
    return function(dispatch, getState){

        // const location = getState().trips.find(trip => trip.id == tripId).destination
        
        // HOW TO REFERENCE ID FROM .ENV const api = process.env.UNSPLASH_API
        const photoUrl = `https://api.unsplash.com/search/photos?page=1&query=London&client_id=b86a7bedd1b8ec0a69b8569aa17c9b1fa7c8377200e6c71c99d09e92da2c1a0d`
            fetch(photoUrl)
            .then(response => response.json())
            .then(data => {
                // data is being fetched but not stored
                dispatch(storeUnplashFetch(data));
            })
            .catch(function(error){
            })
    }
}

export function storeUnsplashFetch(data) {
    return {
        type: 'RECEIVE_UNSPLASH_IMAGES',
        images: data.results
    }
}

// this.setState({currentImage: content.results[0]})










