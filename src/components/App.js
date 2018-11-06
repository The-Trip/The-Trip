<<<<<<< Updated upstream
import React from 'react'
import TripCreationContainer from '../containers/TripCreationContainer';
import '../styles/base/base.scss';
import '../styles/base/forms.scss';
import FlightWrapper from '../containers/FlightWrapper'
class App extends React.Component {
    constructor(){
        super();
    }

    
    render() {
        return (
            <React.Fragment>
                <TripCreationContainer/>
                <FlightWrapper/>
            </React.Fragment>

            
        )

    }
}
=======
import React from 'react';
// import MenuContainer from '../containers/MenuContainer.js'
import SuggestionsContainer from '../containers/SuggestionsContainer.js'
// import TripCreationContainer from '../containers/TripCreationContainer.js'
// import UserInviteContainer from '../containers/UserInviteContainer.js'
// import TripContainer from '../containers/TripContainer.js.js'

function App ({appStatus}) {
    return (
      <div>
      {/* {appStatus === 'menu' && (
        <MenuContainer />
      )
      } */}
      {/* {appStatus === 'suggestions' && ( */}
        <React.Fragment>
          <SuggestionsContainer />
          {/* <TripCreationContainer />
          <UserInviteContainer />
          <TripContainer /> */}
        </React.Fragment> 
      {/* )
      } */}
      </div>
    )
  }
>>>>>>> Stashed changes

export default App;