import { connect } from 'react-redux';
import SuggestionInputFinal from '../components/SuggestionInputFinal.js'
import { addSuggestionToDB } from '../actions/phil';



const mapStateToProps = (state) => {


  return {
    place: state.googlePlaceInfo.find(place => place.place_id == state.selectedPlace)   
  };
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (place, tripId) => {
            event.preventDefault();
            dispatch(addSuggestionToDB(place, tripId));
        }
    }
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionInputFinal);