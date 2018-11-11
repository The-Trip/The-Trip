import { connect } from 'react-redux';
import SuggestionInputFinal from '../components/SuggestionInputFinal.js'
import { addSuggestionToDB, addCommentToDB, commentInputToState } from '../actions/phil';



const mapStateToProps = (state) => {


  return {
    place: state.googlePlaceInfo.find(place => place.place_id == state.selectedPlace)   
  };
};

const mapDispatchToProps = dispatch => {
    return {
        handleChange: event => {
            dispatch(commentInputToState(event.target.name, event.target.value))
        },
        
        handleSubmit: (place, tripId) => {
            event.preventDefault();
            dispatch(addSuggestionToDB(place, tripId));
            dispatch(addCommentToDB());
        }
    }
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionInputFinal);