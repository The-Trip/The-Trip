import { combineReducers } from 'redux';
import setAPIFetchResults from './setAPIFetchResults'
import tripForm from './tripForm'
import trips from './trips'
import user from './user'
import view from './view'
import loginForm from './loginForm'
import selectedPlace from './selectedPlace'


import suggestionForm from './suggestionForm'
import suggestions from './suggestions'

import setFlightsAPIResults from './setFlightsAPIResults'
import googlePlaceInfo from './googlePlaceInfo'


export default combineReducers({
    flightAPIResults: setFlightsAPIResults,
    tripForm,
    suggestionForm,
    user,
    googlePlaceInfo,
    suggestions,
    trips,
    view,
    selectedPlace,
    loginForm
});