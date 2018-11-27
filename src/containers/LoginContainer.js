import { connect } from "react-redux";
import Login from "../components/Login";
import {
  loginToState,
  registerToState,
  addUserToDB,
  loginUser
} from "../actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleChangeLogin: event => {
      dispatch(loginToState(event.target.name, event.target.value));
    },

    handleSubmitLogin: event => {
      event.preventDefault();
      dispatch(loginUser());
    },

    handleChangeRegister: event => {
      dispatch(registerToState(event.target.name, event.target.value));
    },

    handleSubmitRegister: event => {
      event.preventDefault();
      dispatch(addUserToDB());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
