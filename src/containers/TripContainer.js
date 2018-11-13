import { connect } from "react-redux";
import Trip from "../components/Trip";
import { fetchTripsFromDB } from "../actions/phil";
import { setTabOpen } from "../actions/mel";

const mapStateToProps = (state, ownProps) => {
  const trips = state.trips;
  const tripId = parseInt(ownProps.match.params.id, 10);
  const trip = trips.find(trip => trip.id === tripId);
  const userId = state.user.id;
  const tabOpen = state.stylesSwitches.tabOpen;

  console.log(state);

  return {
    tripId,
    trip,
    userId,
    tabOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTripsFromDB: userId => {
      dispatch(fetchTripsFromDB(userId));
    },
    setTabOpen: event => {
      dispatch(setTabOpen());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);
