import { connect } from "react-redux";
import Comments from "../components/Comments.js";
import { setTabOpen } from "../actions/mel";

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments,
    tabOpen: state.stylesSwitches.tabOpen,
    tripId: ownProps.tripId,
    suggestion: ownProps.suggestion
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTabOpen: event => {
      dispatch(setTabOpen());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
