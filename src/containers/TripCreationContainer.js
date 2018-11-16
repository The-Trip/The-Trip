import { connect } from "react-redux";
import TripCreation from "../components/TripCreation";
import { addNewTrip, setTripState, setAddedTripId } from "../actions";

const mapStateToProps = state => {
  return {
    addedTripId: state.addedTripId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: event => {
      dispatch(setTripState(event.target.name, event.target.value));
    },

    handleSubmit: event => {
      event.preventDefault();
      dispatch(addNewTrip());
    },

    resetAddedTripId: () => {
      dispatch(setAddedTripId(null));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCreation);
