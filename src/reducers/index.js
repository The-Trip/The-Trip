import { combineReducers } from 'redux';
import setAPIFetchResults from './setAPIFetchResults'
import tripForm from './tripForm'
import trips from './trips'
import user from './user'
import view from './view'
import loginForm from './loginForm'


import suggestionForm from './suggestionForm'
import suggestions from './suggestions'

import setFlightsAPIResults from './setFlightsAPIResults'


export default combineReducers({
    flightAPIResults: setFlightsAPIResults,
    tripForm,
    suggestionForm,
    suggestions,
    trips,
    user,
    view,
    loginForm
});