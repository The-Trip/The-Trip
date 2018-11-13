import { connect } from "react-redux";
import SuggestionInput from "../components/SuggestionInput.js";
import { suggestionInputToState } from "../actions/phil";
import { googleFetch } from "../actions/chris";

const mapStateToProps = (state, ownProps) => {
  return {
    suggestionInput: state.suggestionInput,
    tripId: ownProps.tripId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: event => {
      dispatch(suggestionInputToState(event.target.name, event.target.value));
    },

    handleSubmit: (event, tripId) => {
      event.preventDefault();
      dispatch(googleFetch(tripId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionInput);
