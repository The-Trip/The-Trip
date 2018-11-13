import React from "react";
import { Route } from "react-router-dom";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import HomeContainer from "../containers/HomeContainer";
import TripsListContainer from "../containers/TripsListContainer";
import TripContainer from "../containers/TripContainer";
import TripCreationContainer from "../containers/TripCreationContainer";
import LoginContainer from "../containers/LoginContainer";
import SocketContainer from "../containers/SocketContainer";

import "../styles/base/base.scss";
import "../styles/base/forms.scss";

function App() {
  return (
    <div>
      <SocketContainer />
      <Nav />
      <main>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/trips/" exact component={TripsListContainer} />
        <Route path="/trips/:id/" component={TripContainer} />
        <Route path="/create-trip/" component={TripCreationContainer} />
        <Route path="/login/" component={LoginContainer} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
