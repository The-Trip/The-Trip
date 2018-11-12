import { connect } from "react-redux";
import Socket from "../components/Socket.js";
import { setView } from "../actions/phil";

const mapStateToProps = state => {
  return {
    view: state.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: view => {
      dispatch(setView(view));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Socket);
