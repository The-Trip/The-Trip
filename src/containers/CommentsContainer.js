import { connect } from "react-redux";
import Comments from "../components/Comments.js";
import { addClickedClass, removeClickedClass } from "../actions";

const mapStateToProps = state => {
  return {
    comments: state.comments,
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
