import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from '../components/Nav';
import Footer from '../components/Footer';


import HomeContainer from '../containers/HomeContainer';
import TripsContainer from '../containers/TripsContainer';
import SuggestionsContainer from '../containers/SuggestionsContainer';
import TripCreationContainer from '../containers/TripCreationContainer';
import LoginContainer from '../containers/LoginContainer';
import SocketContainer from '../containers/SocketContainer'


import '../styles/base/base.scss';
import '../styles/base/forms.scss';

function App() {

  return (
      <div>
        <SocketContainer />
        <Nav />
        <main>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/trip" exact component={TripsContainer} />
        <Route path="/trip/:id/suggestion"  component={SuggestionsContainer} />
        <Route path="/trip/create"  component={TripCreationContainer} />
        <Route path="/login"  component={LoginContainer} />
        </main>
        <Footer />
      </div> 
  )
}

export default App;