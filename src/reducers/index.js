import { combineReducers } from 'redux';
import setFlightsAPIResults from './setFlightsAPIResults'


export default combineReducers({
    flightAPIResults: setFlightsAPIResults
});