import { connect } from "react-redux";
import Trips from  "../components/Trips";
import { fetchTripsFromDB, setView } from "../actions/phil";
import { fetchImageFromUnsplash } from "../actions/mel";

const mapStateToProps = state => {
    return {
        trips: state.trips,
        userId: state.user.id,
        image: state.image
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTripsFromDB: (userId) =>
            dispatch(fetchTripsFromDB(userId)),

        fetchImageFromUnsplash: () => 
            dispatch(fetchImageFromUnsplash()),   

        handleClick: view => {
            dispatch(setView('trip-suggestions'));
        }
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trips);