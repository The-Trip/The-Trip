import { connect } from "react-redux";
import Trip from "../components/Trip";
import { fetchTripsFromDB } from "../actions";

export const mapStateToProps = (state, ownProps) => {
  const trips = state.trips;
  const tripId = parseInt(ownProps.match.params.id, 10);
  const trip = trips.find(trip => trip.id === tripId);
  const userId = state.user.id;

  return {
    tripId,
    trip,
    userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTripsFromDB: userId => {
      dispatch(fetchTripsFromDB(userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);
