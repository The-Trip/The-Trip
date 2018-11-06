import React from "react";
import SuggestionInputContainer from "../containers/SuggestionInputContainer.js";
import SuggestionItem from "./SuggestionItem.js";

function Suggestions({ voting }) {
  return (
    <div>
        <React.Fragment>
          <SuggestionInputContainer />

          <SuggestionItem handleVote={voting} />
        </React.Fragment>
    </div>
  );
}

export default Suggestions;
