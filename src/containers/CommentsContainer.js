import { connect } from "react-redux";
import Comments from "../components/Comments.js";
import { setTabOpen } from "../actions/mel";

const mapStateToProps = state => {
  return {
    comments: state.comments,
    tabOpen: state.stylesSwitches.tabOpen
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
