import React from 'react'
import PlaceResultsContainer from "../containers/PlaceResultsContainer.js";


class PlaceResults extends React.Component {

  constructor() {
      super();
  }

  render() {
    console.log(this.props.googlePlaceInfo)
 
    return (
    <div>
      
      <ul>
        {this.props.googlePlaceInfo.splice(0, 5).map(place => 
          <li key={place.place_id}
          onMouseDown={() => selectPlace(place.place_id)}
          >
          {place.name}
          {/* {place.types[0] === 'night_club' ? 'nightclub' : place.types[0]} */}
          </li>
         )}
      </ul>
         
    </div>
    )
  
  
}
}

export default PlaceResults