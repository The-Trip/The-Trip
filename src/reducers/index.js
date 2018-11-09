import { combineReducers } from 'redux';
import tripForm from './tripForm'
import trips from './trips'
import user from './user'
import view from './view'
import startDate from './startDate'
import endDate from './endDate'
import flightsToCity from './flightsToCity'
import flightsFromCity from './flightsFromCity'

import suggestionForm from './suggestionForm'
import setFlightsAPIResults from './setFlightsAPIResults'


export default combineReducers({
    flightAPIResults: setFlightsAPIResults,
    tripForm,
    suggestionForm,
    trips,
    user,
    view,
    startDate,
    endDate,
    cityFrom: flightsFromCity,
    cityTo: flightsToCity
});