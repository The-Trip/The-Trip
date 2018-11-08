import React from "react";
import SuggestionInputContainer from "../containers/SuggestionInputContainer.js";
import SuggestionItem from "./SuggestionItem.js";
import '../styles/components/Suggestions.scss';

class Suggestions extends React.Component{
    
  constructor() {
      super();
  }

  componentDidMount(){
      this.props.fetchSuggestionsFromDB(this.props.tripId)
  }

  render() {
  return (
   
        <React.Fragment>
        <section className="suggestions">

          <header className="suggestions__header">
            <h1 className="suggestions__title">{trip.destination}</h1>

          <SuggestionInputContainer />

          {/* categories to be incorporated (google places?) */}
            <ul className="suggestions__categories menu--settings">
                <li><a href="">Food and Drink</a></li>
                <li><a href="">Sights</a></li>
            </ul>
          </header>

          <SuggestionItem />

          </section>

        </React.Fragment>
    
  );
}
}

export default Suggestions;
