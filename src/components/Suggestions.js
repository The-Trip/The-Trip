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
    console.log(this.props.suggestions)
  return (
   
        <React.Fragment>
        <section className="suggestions">

          <header className="suggestions__header">
            <h1 className="suggestions__title">{this.props.trip.id}</h1>


          <SuggestionInputContainer />

          {/* categories to be incorporated (google places?) */}
            <ul className="suggestions__categories menu--settings">
                <li><a href="">Food and Drink</a></li>
                <li><a href="">Sights</a></li>
            </ul>
          </header>

          {this.props.suggestions.map((suggestion)=> {
              return (
                  <SuggestionItem key={suggestion.id} suggestion={suggestion} />
              )
          })}

          </section>

        </React.Fragment>
    
  );
}
}

export default Suggestions;
