import { connect } from "react-redux";
import TripsList from "../components/TripsList";
import { fetchTripsFromDB, setView } from "../actions";

import { fetchAllSuggestionsFromDB } from "../actions/chris";

const mapStateToProps = (state, ownProps) => {
  return {
    trips: state.trips,
    userId: state.user.id,
    suggestions: state.suggestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTripsFromDB: userId => dispatch(fetchTripsFromDB(userId)),
    componentDidMount: dispatch(fetchAllSuggestionsFromDB()),

    handleClick: view => {
      dispatch(setView("trip-suggestions"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsList);
