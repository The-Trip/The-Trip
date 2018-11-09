import { connect } from 'react-redux';
import SuggestionInput from '../components/SuggestionInput.js'
import { suggestionInputToState, addSuggestionToDB } from '../actions/phil';


const mapStateToProps = (state, ownProps) => {
  return {
    suggestionInput: state.suggestionInput,
    tripId: ownProps.tripId
    ,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        handleChange: event => {
            console.log(event.target.name);
            console.log(event.target.value);
            dispatch(suggestionInputToState(event.target.name, event.target.value))
        },

        handleSubmit: (event, tripId) => {
            event.preventDefault();
            dispatch(addSuggestionToDB(tripId));
        }
    }
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionInput);