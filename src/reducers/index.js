import { combineReducers } from "redux";
import tripForm from "./tripForm";
import trips from "./trips";
import user from "./user";
import view from "./view";
import loginForm from "./loginForm";
import selectedPlace from "./selectedPlace";
import suggestions from "./suggestions";
import suggestionComment from "./suggestionComment";
import startDate from "./startDate";
import endDate from "./endDate";
import flightsToCity from "./flightsToCity";
import flightsFromCity from "./flightsFromCity";
import suggestionForm from "./suggestionForm";
import setFlightsAPIResults from "./setFlightsAPIResults";
import googlePlaceInfo from "./googlePlaceInfo";
import comments from "./comments";

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
  loginForm,
  suggestionComment,
  startDate,
  endDate,
  cityFrom: flightsFromCity,
  cityTo: flightsToCity,
  comments
});
