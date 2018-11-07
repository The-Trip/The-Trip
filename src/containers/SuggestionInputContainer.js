import { connect } from 'react-redux';
import SuggestionInput from '../components/SuggestionInput.js'
import { suggestionInputToState, addSuggestionToDB } from '../actions/phil';


const mapStateToProps = state => {
  return {
    suggestionInput: state.suggestionInput,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        handleChange: event => {
            console.log(event.target.name);
            console.log(event.target.value);
            dispatch(suggestionInputToState(event.target.name, event.target.value))
        },

        handleSubmit: event => {
            event.preventDefault();
            dispatch(addSuggestionToDB());
        }
    }
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionInput);