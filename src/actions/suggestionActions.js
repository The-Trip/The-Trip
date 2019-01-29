export function addSuggestionToDB(place, tripId) {
  return function(dispatch, getState) {
    return fetch("/api/suggestion", {
      method: "post",
      body: JSON.stringify({
        place: place,
        user: getState().user.id,
        trip: tripId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(id => {
        dispatch(addCommentToDB(id, tripId));
        dispatch(setSelectedPlace(null));
        dispatch(storeGoogleFetch([]));
      });
  };
}

export function fetchAllSuggestionsFromDB() {
  return function(dispatch, getState) {
    fetch(`/api/trip/suggestion`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
      })
      .catch(function(error) {});
  };
}

export function fetchSuggestionsFromDB(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(likeFetch(tripId));
      })
      .catch(function(error) {});
  };
}

export function receiveSuggestions(suggestions) {
  return {
    type: "RECEIVE_SUGGESTIONS",
    suggestions
  };
}

export function suggestionInputClearState() {
  return {
    type: "CLEAR_SUGGESTION_INPUT"
  };
}

export function suggestionInputToState(name, value) {
  return {
    type: "SET_SUGGESTION_INPUT",
    name,
    value
  };
}

/**
 * SUGGESTED PLACES
 * Google Fetch
 */

export function googleFetch(tripId) {
  return function(dispatch, getState) {
    const place = getState().suggestionForm.place;
    const location = getState().trips.find(trip => trip.id == tripId)
      .destination;
    fetch("/api/google", {
      method: "post",
      body: JSON.stringify({ place, location }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(storeGoogleFetch(data));
      })
      .catch(console.error);
  };
}
export function storeGoogleFetch(data) {
  return {
    type: "STORE_GOOGLE",
    destinationInfo: data
  };
}
export function setSelectedPlace(place) {
  return {
    type: "STORE_PLACE",
    selectedPlaceID: place
  };
}

/**
 * COMMENTS
 */
export function commentInputToState(name, value) {
  return {
    type: "SET_COMMENT_INPUT",
    name,
    value
  };
}

export function addCommentToDB(id, tripId) {
  return function(dispatch, getState) {
    return fetch("/api/comment", {
      method: "post",
      body: JSON.stringify({
        suggest_id: id.suggestionID,
        cust_id: getState().user.id,
        comment: getState().suggestionComment
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        dispatch(fetchSuggestionsFromDB(tripId));
        dispatch(fetchCommentsFromDB(tripId));
      });
  };
}

export function addIndivCommentToDB(suggestionId, tripId) {
  return function(dispatch, getState) {
    return fetch("/api/comment", {
      method: "post",
      body: JSON.stringify({
        suggest_id: suggestionId.id,
        cust_id: getState().user.id,
        comment: getState().suggestionComment
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        dispatch(fetchSuggestionsFromDB(tripId));
        dispatch(fetchCommentsFromDB(tripId));
      });
  };
}

export function fetchCommentsFromDB(tripId) {
  return function(dispatch) {
    fetch(`/api/trip/${tripId}/comments`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveComments(result));
      })
      .catch(console.error);
  };
}
export function receiveComments(results) {
  return {
    type: "STORE_COMMENTS",
    comments: results
  };
}

/**
 * LIKES
 */
export function addLike(suggestionId, tripId) {
  return function(dispatch, getState) {
    fetch(`/api/addlike`, {
      method: "post",
      body: JSON.stringify({
        suggestionId: suggestionId,
        customerId: getState().user.id,
        tripId: tripId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(tripLikes => {
        dispatch(setLikes(tripLikes));
      })
      .catch(console.error);
  };
}

export function removeLike(suggestionId, tripId) {
  return function(dispatch, getState) {
    fetch(`/api/removelike`, {
      method: "post",
      body: JSON.stringify({
        suggestionId: suggestionId,
        customerId: getState().user.id,
        tripId: tripId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(tripLikes => {
        dispatch(setLikes(tripLikes));
      })
      .catch(console.error);
  };
}

export function likeFetch(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/${tripId}/likefetch`)
      .then(response => response.json())
      .then(tripLikes => {
        dispatch(setLikes(tripLikes));
      })
      .catch(console.error);
  };
}

export function setLikes(tripLikes) {
  return {
    type: "SET_TRIP_LIKES",
    tripLikes
  };
}

/**
 * FAVOURITES
 */
export function addFavourite(suggestionId, tripId) {
  return function(dispatch, getState) {
    fetch(`/api/add-favourite`, {
      method: "post",
      body: JSON.stringify({
        suggestionId: suggestionId,
        customerId: getState().user.id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        fetchSuggestionsFromDB(tripId);
      })
      .catch(console.error);
  };
}

export function removeFavourite(suggestionId, tripId) {
  return function(dispatch, getState) {
    fetch(`/api/remove-favourite`, {
      method: "post",
      body: JSON.stringify({
        suggestionId: suggestionId,
        customerId: getState().user.id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        fetchSuggestionsFromDB(tripId);
      })
      .catch(console.error);
  };
}

/**
 * ORDER BY TIME
 */
export function ascendChronFetch(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion/achron`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(likeFetch(tripId));
      })
      .catch(function(error) {});
  };
}

export function descendChronFetch(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion/dchron`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(likeFetch(tripId));
      })
      .catch(function(error) {});
  };
}

/**
 * ORDER BY LIKES
 */
export function ascendLikesFetch(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion/alike`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(likeFetch(tripId));
      })
      .catch(function(error) {});
  };
}

export function descendLikesFetch(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion/dlike`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(likeFetch(tripId));
      })
      .catch(function(error) {});
  };
}

/**
 * FAVOURITES-ONLY FILTER
 */
export function filterOutFavsFetch(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion/favout`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(likeFetch(tripId));
      })
      .catch(function(error) {});
  };
}
export function filterInFavsFetch(tripId) {
  return function(dispatch, getState) {
    fetch(`/api/trip/${tripId}/suggestion/favfilter`)
      .then(response => response.json())
      .then(result => {
        dispatch(receiveSuggestions(result));
        dispatch(likeFetch(tripId));
      })
      .catch(function(error) {});
  };
}

/**
 * TOGGLE LIKES AND FAVOURITES
 */
export function removeClickedLike(id) {
  return {
    type: "ADD_CLICKED_LIKE",
    id
  };
}
export function addClickedLike(id) {
  return {
    type: "REMOVE_CLICKED_LIKE",
    id
  };
}
export function addClickedFav(id) {
  return {
    type: "ADD_CLICKED_FAV",
    id
  };
}
export function removeClickedFav(id) {
  return {
    type: "REMOVE_CLICKED_FAV",
    id
  };
}

/**
 * TOGGLE/ORDER FILTER
 */
export function addClickedTime(id) {
  return {
    type: "ADD_CLICKED_TIME",
    id
  };
}

export function removeClickedTime(id) {
  return {
    type: "REMOVE_CLICKED_TIME",
    id
  };
}

export function addClickedLikes(id) {
  return {
    type: "ADD_CLICKED_LIKES",
    id
  };
}

export function removeClickedLikes(id) {
  return {
    type: "REMOVE_CLICKED_LIKES",
    id
  };
}

export function addClickedFavFilter(id) {
  return {
    type: "ADD_CLICKED_FAVFILTER",
    id
  };
}

export function removeClickedFavFilter(id) {
  return {
    type: "REMOVE_CLICKED_FAVFILTER",
    id
  };
}
