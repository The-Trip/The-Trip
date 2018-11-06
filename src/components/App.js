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

export default App;