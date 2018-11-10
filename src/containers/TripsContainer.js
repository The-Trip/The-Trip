import { connect } from "react-redux";
import Trips from  "../components/Trips";
import { fetchTripsFromDB, setView } from "../actions/phil";
import { fetchImagesFromUnsplash } from "../actions/mel";

const mapStateToProps = state => {
    return {
        trips: state.trips,
        userId: state.user.id,
        images: state.images
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTripsFromDB: (userId) =>
            dispatch(fetchTripsFromDB(userId)),

        fetchImagesFromUnsplash: () => 
            dispatch(fetchImagesFromUnsplash()),   

        handleClick: view => {
            dispatch(setView('trip-suggestions'));
        }
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trips);