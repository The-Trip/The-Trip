import { connect } from "react-redux";
import UserInvite from "../components/UserInvite";
import { inviteCodeToState, checkInviteCode } from "../actions";

export const mapStateToProps = (state, ownProps) => {
  const inviteCode = parseInt(ownProps.match.params.code, 10);

  return {
    inviteCode
  };
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
