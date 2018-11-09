import React from "react";

class TripCreation extends React.Component {

    constructor() {
        super();
    }
    render() {
        
  return (
     <form className="trip-creation"
     onSubmit={event => {
        this.props.handleClick(event);
        }}
     >
     <input
        id="trip-name"
        type="text"
        name="name"
        className="trip-creation__name"
        // defaultValue="Trip Name"
        onChange={event => this.props.handleChange(event)}
      />
      <input
        id="origin"
        type="text"
        name="origin"
        className="trip-creation__origin"
        // defaultValue="Destination"
        onChange={event => this.props.handleChange(event)}
      />
     <input
        id="destination"
        type="text"
        name="destination"
        className="trip-creation__location"
        // defaultValue="Destination"
        onChange={event => this.props.handleChange(event)}
      />

      <button
        type="submit"
        >Submit</button>
     </form>
  );
}
}

    

export default TripCreation;
