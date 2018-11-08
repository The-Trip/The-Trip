import React from "react";
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
    </React.Fragment>
  );
}

export default Nav;