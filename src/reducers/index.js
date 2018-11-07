import { combineReducers } from 'redux';
import setAPIFetchResults from './setAPIFetchResults'
import tripForm from './tripForm'
import trip from './trip'
import user from './user'
import suggestionForm from './suggestionForm'
import setFlightsAPIResults from './setFlightsAPIResults'


export default combineReducers({
    flightAPIResults: setFlightsAPIResults,
    tripForm,
    suggestionForm,
    trip,
    user
});