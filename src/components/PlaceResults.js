import React from "react";
import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";

class PlaceResults extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.googlePlaceInfo.slice(0, 5).map(place => (
            <li
              key={place.place_id}
              onMouseDown={() => this.props.selectPlace(place.place_id)}
            >
              {place.name}
              {/* {place.types[0] === 'night_club' ? 'nightclub' : place.types[0]} */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PlaceResults;
