import { connect } from "react-redux";
import SuggestionInputFinal from "../components/SuggestionInputFinal.js";
import { addSuggestionToDB, commentInputToState } from "../actions/phil";
import AddIndivComment from "../components/AddIndivComment.js";

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
      // dispatch(addCommentToDB());
    }
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SuggestionInputFinal);

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const SuggestionInputFinalContainer = connector(SuggestionInputFinal);
export const AddIndivCommentContainer = connector(AddIndivComment);
