import React from 'react'
import TripCreationContainer from '../containers/TripCreationContainer';
import SuggestionsContainer from '../containers/SuggestionsContainer';

import '../styles/base/base.scss';
import '../styles/base/forms.scss';


function App() {

    
    return (
        <div>
          HELLO
        {/* {appStatus === 'menu' && (
          <MenuContainer />
        )
        } */}
        {/* {appStatus === 'suggestions' && ( */}
          <React.Fragment>
            <SuggestionsContainer />
            <TripCreationContainer />

            {/* <UserInviteContainer />
            <TripContainer /> */}
          </React.Fragment> 
        {/* )
        } */}
        </div>
    )
      }

export default App;