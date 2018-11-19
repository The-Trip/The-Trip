import { connect } from "react-redux";
import Suggestions from "../components/Suggestions.js";
import {
  fetchSuggestionsFromDB,
  fetchCommentsFromDB,
  removeClickedClass,
  addClickedClass
} from "../actions";
import {
  addLike,
  removeLike,
  addFavourite,
  removeFavourite,
  likeFetch
} from "../actions/chris";

const mapStateToProps = (state, ownProps) => {
  const trips = state.trips;
  const tripId = parseInt(ownProps.match.params.id, 10);
  const trip = trips.find(trip => trip.id === tripId);
  const clickedLike = state.stylesSwitches.clicked;
  const clickedFav = state.stylesSwitches.clicked;

  console.log(state.tripLikes);

  return {
    suggestions: state.suggestions,
    tripId,
    trip,
    selectedPlace: state.selectedPlace,
    comments: state.comments,
    clickedLike,
    tripLikes: state.tripLikes,
    clickedFav
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
      dispatch(addClickedClass());
      console.log("clicked add like");
      dispatch(addLike(suggestionId, tripId));
    },

    removeLike: (suggestionId, tripId) => {
      console.log("clicked remove like");
      dispatch(removeClickedClass());
      dispatch(removeLike(suggestionId, tripId));
    },

    addFavourites: (suggestionId, tripId) => {
      dispatch(addClickedClass());
      console.log("clicked add fav");
      dispatch(addFavourite(suggestionId, tripId));
    },
    removeFavourites: (suggestionId, tripId) => {
      dispatch(removeClickedClass());
      console.log("clicked remove fav");
      dispatch(removeFavourite(suggestionId, tripId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
