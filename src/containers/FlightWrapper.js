import { connect } from "react-redux";
import Flight from "../components/Flight";
import {
  fetchFlights,
  isAPILoading,
  setEndDate,
  setStartDate
} from "../actions";
import { addClickedClass, removeClickedClass } from "../actions";

const mapStateToProps = (state, ownProps) => {
  const tripId = parseInt(ownProps.match.params.id, 10);
  return {
    flightResults: state.flightAPIResults.data,
    startDate: state.startDate,
    endDate: state.endDate,
    isAPILoading: state.isAPILoading,
    cityFrom: state.cityFrom,
    cityTo: state.cityTo,
    clicked: state.stylesSwitches.clicked,
    tripId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFlights: (flyFrom, flyTo, dateFrom, dateTo) =>
      dispatch(fetchFlights(flyFrom, flyTo, dateFrom, dateTo)),
    setStartDate: date => dispatch(setStartDate(date)),
    setEndDate: date => dispatch(setEndDate(date)),
    isAPILoading: () => dispatch(isAPILoading()),
    addClickedClass: event => dispatch(addClickedClass()),
    removeClickedClass: event => dispatch(removeClickedClass())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flight);
