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
  removeClickedLikes,
  filterOutFavsFetch,
  addClickedFavFilter,
  removeClickedFavFilter
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  const trips = state.trips;
  const tripId = parseInt(ownProps.match.params.id, 10);
  const contentType = ownProps.match.params.contentType;
  const trip = trips.find(trip => trip.id === tripId);
  const clickedLike = state.switcher.clickedLike;
  const clickedFav = state.switcher.clickedFav;
  const clickedTime = state.switcher.clickedTime;
  const clickedLikes = state.switcher.clickedLikes;

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
      dispatch(addLike(suggestionId, tripId));
    },

    removeLike: (suggestionId, tripId) => {
      dispatch(removeClickedLike());
      dispatch(removeLike(suggestionId, tripId));
    },

    addFavourites: (suggestionId, tripId) => {
      dispatch(addClickedFav());
      dispatch(addFavourite(suggestionId, tripId));
    },
    removeFavourites: (suggestionId, tripId) => {
      dispatch(removeClickedFav());
      dispatch(removeFavourite(suggestionId, tripId));
    },
    orderTimeAsc: tripId => {
      dispatch(addClickedTime());
      dispatch(ascendChronFetch(tripId));
    },
    orderTimeDesc: tripId => {
      dispatch(removeClickedTime());
      dispatch(descendChronFetch(tripId));
    },
    orderLikesAsc: tripId => {
      dispatch(addClickedLikes());
      dispatch(ascendLikesFetch(tripId));
    },
    orderLikesDesc: tripId => {
      dispatch(removeClickedLikes());
      dispatch(descendLikesFetch(tripId));
    },
    filterFavsIn: tripId => {
      dispatch(addClickedFavFilter());
      dispatch(fetchSuggestionsFromDB(tripId));
    },
    filterFavsOut: tripId => {
      dispatch(removeClickedFavFilter());
      dispatch(filterOutFavsFetch(tripId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
