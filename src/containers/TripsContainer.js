import { connect } from "react-redux";
import Trips from  "../components/Trips";
import { fetchTripsFromDB, setView } from "../actions/phil"

const mapStateToProps = state => {
    return {
        trips: state.trips,
        userId: state.user.id
    };
}


const mapDispatchToProps = dispatch => {
    return {
        fetchTripsFromDB: (userId) =>
            dispatch(fetchTripsFromDB(userId)),
            handleClick: view => {
                dispatch(setView('trip-suggestions'));
            }
        }

    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trips);