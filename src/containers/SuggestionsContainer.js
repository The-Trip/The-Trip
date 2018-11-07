import { connect } from 'react-redux';
import Suggestions from '../components/Suggestions.js'
// import { fetchQuestionFromAPI, countSecond } from '../actions';


const mapStateToProps = state => {
  return {
  suggestions: state.suggestions,
  };
};

const mapDispatchToProps = dispatch => {
    return {
      voting: () => {
        console.log('voting')  
      }
    }
  };


export default connect(
  mapStateToProps,
)(Suggestions);