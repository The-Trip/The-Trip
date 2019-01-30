import { connect } from "react-redux";
import Register from "../components/Register";
import { registerToState, addUserToDB } from "../actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
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
)(Register);
