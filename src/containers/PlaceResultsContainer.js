import { connect } from 'react-redux';
import PlaceResults from '../components/PlaceResults.js';
import { setSelectedPlace } from "../actions/chris";


const mapStateToProps = state => {
  return {
      
    googlePlaceInfo: state.googlePlaceInfo
  };
};


const mapDispatchToProps = dispatch => {

    
    return {
        selectPlace: place => {
            dispatch(setSelectedPlace(place));
            console.log("set selected");
     
      }
    }
  
}

export default connect(
  mapStateToProps,
)(PlaceResults);