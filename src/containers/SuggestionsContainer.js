import { connect } from 'react-redux';
import Suggestions from '../components/Suggestions.js'
import { fetchSuggestionsFromDB } from '../actions/phil';


const mapStateToProps = (state, ownProps) => {
  return {
  suggestions: state.suggestions,
  tripId: ownProps.match.params.id
  };
};


const mapDispatchToProps = dispatch => {
  return {
      fetchSuggestionsFromDB: (tripId) =>
          dispatch(fetchSuggestionsFromDB(tripId))
      }
  }


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);