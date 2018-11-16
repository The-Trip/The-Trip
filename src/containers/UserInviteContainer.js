import { connect } from "react-redux";
import UserInvite from "../components/UserInvite";
import { inviteCodeToState, checkInviteCode } from "../actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: event => {
      console.log(event.target.name);
      console.log(event.target.value);
      dispatch(inviteCodeToState(event.target.name, event.target.value));
    },

    handleSubmit: event => {
      console.log("handle submit login");
      event.preventDefault();
      dispatch(checkInviteCode());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInvite);
