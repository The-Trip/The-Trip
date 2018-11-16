import { connect } from "react-redux";
import Login from "../components/Login";
import {
  loginToState,
  registerToState,
  addUserToDB,
  loginUser
} from "../actions/phil";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleChangeLogin: event => {
      console.log(event.target.name);
      console.log(event.target.value);
      dispatch(loginToState(event.target.name, event.target.value));
    },

    handleSubmitLogin: event => {
      console.log("handle submit login");
      event.preventDefault();
      dispatch(loginUser());
    },

    handleChangeRegister: event => {
      console.log(event.target.name);
      console.log(event.target.value);
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
