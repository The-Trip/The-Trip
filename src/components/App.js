import React from 'react'
import FlightWrapper from '../containers/FlightWrapper'

class App extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <React.Fragment>
                <FlightWrapper/>
            </React.Fragment>
        )

    }
}

export default App;