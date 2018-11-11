import { connect } from "react-redux";
import TripCreation from  "../components/TripCreation";
import { addNewTrip, setTripState} from '../actions/chris';

const mapStateToProps = state => {
    return {
        

    };
}

const mapDispatchToProps = dispatch => {
    return {
        handleChange: event => {
            console.log(event.target.name);
            console.log(event.target.value);
            dispatch(setTripState(event.target.name, event.target.value))
        },

        handleSubmit: event => {
            event.preventDefault();
            dispatch(addNewTrip());
            // dispatch(googleFetch());
            // console.log(event.target.tripName.value);
            // console.log(event.target.destination.value);
        },
      
    }
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TripCreation);