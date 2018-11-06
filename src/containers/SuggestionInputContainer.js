import { connect } from 'react-redux';
import SuggestionInput from '../components/SuggestionInput.js'
// import { fetchQuestionFromAPI, countSecond } from '../actions';


const mapStateToProps = state => {
  return {
  suggestionInput: state.suggestionInput,
  };
};

const mapDispatchToProps = dispatch => {
    return {
      handleChange: () => {
        console.log('handleChange')  
      },
      handleSubmit: (answer) => {
        console.log('handleSubmit')  
      }
    }
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionInput);