import { connect } from "react-redux";
import Suggestions from "../components/Suggestions.js";
import { fetchSuggestionsFromDB } from "../actions";
import { fetchCommentsFromDB } from "../actions";

const mapStateToProps = (state, ownProps) => {
  const trips = state.trips;
  const tripId = parseInt(ownProps.match.params.id, 10);
  const trip = trips.find(trip => trip.id === tripId);

  return {
    suggestions: state.suggestions,
    tripId,
    trip,
    selectedPlace: state.selectedPlace,
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSuggestionsFromDB: tripId => {
      dispatch(fetchSuggestionsFromDB(tripId));
      dispatch(fetchCommentsFromDB(tripId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
