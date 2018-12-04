import { connect } from "react-redux";
import SuggestionInputFinal from "../components/SuggestionInputFinal.js";
import {
  addSuggestionToDB,
  commentInputToState,
  addCommentToDB
} from "../actions";

const mapStateToProps = state => {
  return {
    // suggestion_id: state.suggestions,
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
      console.log("hi there");
      event.preventDefault();
      console.log({ place, tripId, event });

      dispatch(addSuggestionToDB(place, tripId));
      // dispatch(addCommentToDB());
    },

    handleCommentSubmit: (place, tripId, event, suggestion_id) => {
      event.preventDefault();
      // console.log({ place, tripId, event, suggestion_id });
      dispatch(addCommentToDB(place, tripId, suggestion_id));
      // dispatch(addCommentToDB());
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
