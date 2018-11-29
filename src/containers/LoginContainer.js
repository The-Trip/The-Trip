import { connect } from "react-redux";
import Login from "../components/Login";
import { loginToState, loginUser } from "../actions";

const mapStateToProps = state => {
  const loginMessage = state.loginMessage;
  return {
    loginMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChangeLogin: event => {
      dispatch(loginToState(event.target.name, event.target.value));
    },

    handleSubmitLogin: event => {
      event.preventDefault();
      dispatch(loginUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
