import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TripsContainer from "../containers/TripsContainer.js";
import HomeContainer from "../containers/HomeContainer.js";


function Nav ({ view }) {
  return (
    <React.Fragment>
        <p>This is Nav.js</p>
        {view === 'home' && (
            <HomeContainer />
        )}
        {view === 'your-trips' && (
            <TripsContainer />
        )}
        {view === 'trip-suggestions' && (
            <SuggestionsContainer />
        )}
    </React.Fragment>
  );
}

export default Nav;