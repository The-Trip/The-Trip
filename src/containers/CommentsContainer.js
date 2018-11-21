import { connect } from "react-redux";
import Comments from "../components/Comments.js";
import { addClickedClass, removeClickedClass } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments,
    tabOpen: state.stylesSwitches.tabOpen,
    tripId: ownProps.tripId,
    suggestion: ownProps.suggestion,
    clicked: state.stylesSwitches.clicked,
    tripLike: ownProps.tripLike
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addClickedClass: id => {
      dispatch(addClickedClass(id));
    },
    removeClickedClass: id => {
      dispatch(removeClickedClass(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
