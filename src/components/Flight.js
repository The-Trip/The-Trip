import React from "react";

class Flight extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchFlights();
  }

  render() {
    return (
      <div>
        <p>Hello World!</p>
      </div>
    );
  }
}

export default Flight;
