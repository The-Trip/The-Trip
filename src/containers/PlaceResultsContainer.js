import { connect } from "react-redux";
import PlaceResults from "../components/PlaceResults.js";
import { setSelectedPlace } from "../actions/chris";

const mapStateToProps = state => {
  return {
    googlePlaceInfo: state.googlePlaceInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPlace: place => {
      dispatch(setSelectedPlace(place));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceResults);
