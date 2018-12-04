import { connect } from "react-redux";
import SuggestionInput from "../components/SuggestionInput.js";
import {
  suggestionInputToState,
  suggestionInputClearState,
  googleFetch
} from "../actions";

export const mapStateToProps = (state, ownProps) => {
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
    },

    suggestionInputClearState: () => {
      dispatch(suggestionInputClearState);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionInput);
