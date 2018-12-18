import { connect } from "react-redux";
import Home from "../components/Home.js";
import { fetchCustomersDestinationsFromDB } from "../actions";

const mapStateToProps = state => {
  const custDest = state.splashTripDestinations;
  return {
    view: state.view,
    splashImage: custDest[Math.floor(Math.random() * custDest.length)]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchImages: () => {
      dispatch(fetchCustomersDestinationsFromDB());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
