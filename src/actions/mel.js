// fetch needs to happen for each tripitem; do I therefore need to run ComponentDidMount in TripItem comp?

// I will need to pull from state to get query string for location
// const location = getState().trips.find(trip => trip.id == tripId).destination

// api from dotenv is not referencing - needs to be sorted before merge
//const api = process.env.UNSPLASH_API

export function fetchImageFromUnsplash() {
    return function(dispatch, getState){

        const photoUrl = `https://api.unsplash.com/search/photos?page=1&query=Zagreb&client_id=b86a7bedd1b8ec0a69b8569aa17c9b1fa7c8377200e6c71c99d09e92da2c1a0d`
            fetch(photoUrl)
            .then(response => response.json())
            .then(data => {
                console.log("fetchImageFromUnsplash ======= ", data.results[0].urls);
                dispatch(storeUnplashFetch(data))
            })
            .catch(function(error){
                // something went wrong. let's sort it out
            });
    }
};

// grab the urls object containing all urls for display on different devices
export function storeUnsplashFetch(data) {
    return {
        type: 'STORE_UNSPLASH_IMAGE_URLS',
        image: data.results[0].urls
    }
}










