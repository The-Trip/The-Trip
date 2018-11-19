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
import suggestionForm from "./suggestionForm";
import addedTripId from "./addedTripId";
import setFlightsAPIResults from "./setFlightsAPIResults";
import googlePlaceInfo from "./googlePlaceInfo";
import isAPILoading from "./isAPILoading";
import comments from "./comments";
import stylesSwitches from "./stylesSwitches";
import registerForm from "./registerForm";
import receiveFlightsFromDB from "./receiveFlightsFromDB";
import registered from "./registered";
import splashTripDestinations from "./splashTripDestinations";
import inviteCodeForm from "./inviteCodeForm";
import tripLikes from "./tripLikes";
import setNewUserTrip from "./setNewUserTrip";
import newUserInvite from "./newUserInvite";

export default combineReducers({
  flightAPIResults: setFlightsAPIResults,
  tripForm,
  suggestionForm,
  user,
  googlePlaceInfo,
  suggestions,
  trips,
  addedTripId,
  view,
  selectedPlace,
  loginForm,
  suggestionComment,
  startDate,
  endDate,
  isAPILoading,
  comments,
  stylesSwitches,
  registerForm,
  flightsFromDB: receiveFlightsFromDB,
  inviteCodeForm,
  registered,
  splashTripDestinations,
  tripLikes,
  setNewUserTrip,
  newUserInvite
});
