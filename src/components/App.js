import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomeContainer from '../containers/HomeContainer';
import TripsContainer from '../containers/TripsContainer';
import SuggestionsContainer from '../containers/SuggestionsContainer';
import TripCreationContainer from '../containers/TripCreationContainer';

import '../styles/base/base.scss';
import '../styles/base/forms.scss';

function App() {

  return (
    <Router>
      <React.Fragment>

        <Route path="/" exact component={HomeContainer} />
        <Route path="/trip" exact component={TripsContainer} />
        <Route path="/trip/:id/suggestion"  component={SuggestionsContainer} />
        <Route path="/trip/create"  component={TripCreationContainer} />


        {/* <Route path="/trip/" component={Users} /> */}

        {/* <Footer /> */}
      </React.Fragment> 
    </Router>
  )
}

export default App;