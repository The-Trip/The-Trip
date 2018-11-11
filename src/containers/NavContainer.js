import { connect } from "react-redux";
import Nav from "../components/Nav.js";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: event => {
      console.log(event.target.name);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
