import { connect } from "react-redux";
import { withRouter } from "react-router";
import Nav from "../components/Nav.js";
import { checkLogin } from "../actions";

const mapStateToProps = state => {
  return {
    user: state.user.id,
    registered: state.registered,
    setNewUserTrip: state.setNewUserTrip,
    newUserInvite: state.newUserInvite,
    inviteCode: state.inviteCodeForm.inviteCode
  };
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
)(withRouter(Nav));
