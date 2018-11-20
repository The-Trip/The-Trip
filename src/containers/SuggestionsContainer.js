import { connect } from "react-redux";
import Suggestions from "../components/Suggestions.js";
import { fetchSuggestionsFromDB, fetchCommentsFromDB } from "../actions";
import {
  addLike,
  removeLike,
  addFavourite,
  removeFavourite,
  likeFetch,
  ascendChronFetch,
  descendChronFetch,
  ascendLikesFetch,
  descendLikesFetch,
  addClickedLike,
  removeClickedLike,
  addClickedFav,
  removeClickedFav,
  addClickedTime,
  removeClickedTime,
  addClickedLikes,
  removeClickedLikes
} from "../actions/chris";

const mapStateToProps = (state, ownProps) => {
  const trips = state.trips;
  const tripId = parseInt(ownProps.match.params.id, 10);
  const contentType = ownProps.match.params.contentType;
  const trip = trips.find(trip => trip.id === tripId);
  const clickedLike = state.switcher.clickedLike;
  const clickedFav = state.switcher.clickedFav;
  const clickedTime = state.switcher.clickedTime;
  const clickedLikes = state.switcher.clickedLikes;

  // console.log(state.tripLikes);

  return {
    suggestions: state.suggestions,
    tripId,
    trip,
    selectedPlace: state.selectedPlace,
    comments: state.comments,
    clickedLike,
    tripLikes: state.tripLikes,
    clickedFav,
    contentType,
    clickedTime,
    clickedLikes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSuggestionsFromDB: tripId => {
      dispatch(fetchSuggestionsFromDB(tripId));
      dispatch(fetchCommentsFromDB(tripId));
      dispatch(likeFetch(tripId));
    },

    addLike: (suggestionId, tripId) => {
      dispatch(addClickedLike());
      console.log("clicked add like");
      dispatch(addLike(suggestionId, tripId));
    },

    removeLike: (suggestionId, tripId) => {
      console.log("clicked remove like");
      dispatch(removeClickedLike());
      dispatch(removeLike(suggestionId, tripId));
    },

    addFavourites: (suggestionId, tripId) => {
      dispatch(addClickedFav());
      console.log("clicked add fav");
      dispatch(addFavourite(suggestionId, tripId));
    },
    removeFavourites: (suggestionId, tripId) => {
      dispatch(removeClickedFav());
      console.log("clicked remove fav");
      dispatch(removeFavourite(suggestionId, tripId));
    },
    orderTimeAsc: tripId => {
      console.log("clicked time up");
      dispatch(addClickedTime());
      dispatch(ascendChronFetch(tripId));
    },
    orderTimeDesc: tripId => {
      dispatch(removeClickedTime());
      console.log("clicked time down");
      dispatch(descendChronFetch(tripId));
    },
    orderLikesAsc: tripId => {
      dispatch(addClickedLikes());
      console.log("clicked like down");
      dispatch(ascendLikesFetch(tripId));
    },
    orderLikesDesc: tripId => {
      dispatch(removeClickedLikes());
      console.log("clicked like up");
      dispatch(descendLikesFetch(tripId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
