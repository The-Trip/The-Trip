import { connect } from "react-redux";
import Comments from "../components/Comments.js";
import { addClickedClass, removeClickedClass } from "../actions/mel";

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments,
    tabOpen: state.stylesSwitches.tabOpen,
    tripId: ownProps.tripId,
    suggestion: ownProps.suggestion,
    clicked: state.stylesSwitches.clicked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addClickedClass: event => {
      dispatch(addClickedClass());
    },
    removeClickedClass: event => {
      dispatch(removeClickedClass());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
