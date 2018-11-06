import { combineReducers } from 'redux';
import setAPIFetchResults from './setAPIFetchResults'
import tripForm from './tripForm'
import setFlightsAPIResults from './setFlightsAPIResults'


export default combineReducers({
    flightAPIResults: setFlightsAPIResults,
    tripForm
});