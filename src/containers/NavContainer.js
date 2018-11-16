import { connect } from "react-redux";
import Nav from "../components/Nav.js";
import { checkLogin } from "../actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    checkLogin: () => {
      dispatch(checkLogin());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
