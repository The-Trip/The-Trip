import React from "react";
import SuggestionInputContainer from "../containers/SuggestionInputContainer.js";
import SuggestionItem from "./SuggestionItem.js";

class Suggestions extends React.Component{
    
  constructor() {
      super();
  }

  componentDidMount(){
      this.props.fetchSuggestionsFromDB(this.props.tripId)
  }

  render() {
  return (
    <div>
        <React.Fragment>
          <SuggestionInputContainer />

          <SuggestionItem />
        </React.Fragment>
    </div>
  );
}
}

export default Suggestions;
