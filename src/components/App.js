import React from "react";
import { Route } from "react-router-dom";

import NavContainer from "../containers/NavContainer";
import Footer from "../components/Footer";

import HomeContainer from "../containers/HomeContainer";
import TripsListContainer from "../containers/TripsListContainer";
import TripContainer from "../containers/TripContainer";
import TripCreationContainer from "../containers/TripCreationContainer";
import LoginContainer from "../containers/LoginContainer";
import RegisterContainer from "../containers/RegisterContainer";

import SocketContainer from "../containers/SocketContainer";
import UserInviteContainer from "../containers/UserInviteContainer";

import "../styles/base/base.scss";
import "../styles/base/forms.scss";
import FlightWrapper from "../containers/FlightWrapper";

function App() {
  return (
    <div>
      {/* <SocketContainer /> */}
      <NavContainer />
      <main>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/trips/friends/" exact component={TripsListContainer} />
        <Route path="/trips/" exact component={TripsListContainer} />
        <Route path="/trips/:id/" component={TripContainer} />
        <Route path="/create-trip/" component={TripCreationContainer} />
        <Route path="/login/" component={LoginContainer} />
        <Route path="/register/" component={RegisterContainer} />

        <Route path="/flights/" component={FlightWrapper} />
        <Route path="/invite/" component={UserInviteContainer} />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
