import React from 'react'
import TripCreationContainer from '../containers/TripCreationContainer';



class App extends React.Component {
    constructor(){
        super();
    }

    
    render() {
        return (
            <React.Fragment>
                {/* <p> Hello! </p>   */}
                <TripCreationContainer/>
            </React.Fragment>

            
        )

    }
}

export default App;