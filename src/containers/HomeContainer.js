import { connect } from "react-redux";
import Home from "../components/Home.js";
import { setView } from "../actions/phil";

export const mapStateToProps = state => {
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
)(Home);
