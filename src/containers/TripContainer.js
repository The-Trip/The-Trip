import { connect } from "react-redux";
import Trip from "../components/Trip";

const mapStateToProps = (state, ownProps) => {
  const trips = state.trips;
  const tripId = ownProps.match.params.id;
  const trip = trips.find(trip => trip.id == tripId);

  return {
    tripId,
    trip
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);
