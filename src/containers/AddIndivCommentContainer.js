import { connect } from "react-redux";
import AddIndivComment from "../components/AddIndivComment.js";
import { commentInputToState, addIndivCommentToDB } from "../actions/phil";

const mapStateToProps = (state, ownProps) => {
  return {
    suggestionId: ownProps.suggestionId,
    tripId: ownProps.tripId,
    place: ownProps.suggestion
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: event => {
      dispatch(commentInputToState(event.target.name, event.target.value));
    },

    handleCommentSubmit: (suggestionId, tripId, event, place) => {
      event.preventDefault();
      dispatch(addIndivCommentToDB(suggestionId, tripId, event));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIndivComment);
