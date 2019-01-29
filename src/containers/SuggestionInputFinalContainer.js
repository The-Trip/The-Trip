import { connect } from "react-redux";
import SuggestionInputFinal from "../components/SuggestionInputFinal.js";
import {
  addSuggestionToDB,
  commentInputToState,
  addCommentToDB
} from "../actions";

const mapStateToProps = state => {
  return {
    place: state.googlePlaceInfo.find(
      // eslint-disable-next-line
      place => place.place_id == state.selectedPlace
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: event => {
      dispatch(commentInputToState(event.target.name, event.target.value));
    },

    handleSubmit: (place, tripId, event) => {
      event.preventDefault();
      dispatch(addSuggestionToDB(place, tripId));
    },

    handleCommentSubmit: (place, tripId, event, suggestion_id) => {
      event.preventDefault();
      dispatch(addCommentToDB(place, tripId, suggestion_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionInputFinal);

// const connector = connect(
//   mapStateToProps,
//   mapDispatchToProps
// );

// export const SuggestionInputFinalContainer = connector(SuggestionInputFinal);
// export const AddIndivCommentContainer = connector(AddIndivComment);
