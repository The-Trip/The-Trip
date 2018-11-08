import React from 'react'
import NavContainer from '../containers/NavContainer';
import FlightWrapper from '../containers/FlightWrapper'

import '../styles/base/base.scss';
import '../styles/base/forms.scss';


function App() {

  return (
    <React.Fragment>
      <NavContainer />
        <FlightWrapper />
    </React.Fragment> 
  )
}

export default App;