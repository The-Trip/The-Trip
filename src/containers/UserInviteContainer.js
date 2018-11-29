import { connect } from "react-redux";
import UserInvite from "../components/UserInvite";
import { inviteCodeToState, checkInviteCode } from "../actions";

export const mapStateToProps = (state, ownProps) => {
  const inviteCode = ownProps.match.params.code;

  return {
    inviteCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: event => {
      dispatch(inviteCodeToState(event.target.name, event.target.value));
    },

    handleSubmit: event => {
      event.preventDefault();
      dispatch(checkInviteCode());
    },

    setInviteCode: code => {
      dispatch(inviteCodeToState("inviteCode", code));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInvite);
