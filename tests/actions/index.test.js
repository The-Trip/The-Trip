import {
  receiveFlights,
  setStartDate,
  setEndDate,
  suggestionInputToState,
  commentInputToState,
  loginToState,
  registerToState,
  suggestionsFromDB,
  setView,
  receiveTrips,
  receiveSuggestions,
  setTripState,
  storeGoogleFetch,
  setSelectedPlace,
  receiveComments,
  setAddedTripId
} from "../../src/actions";

describe("receiveFlights", () => {
  it("sets state based on APIResult", () => {
    const testAPIResponse = {
      data: [
        {
          flightTo: "London",
          flightFrom: "New York"
        }
      ],
      flightNumber: 1234,
      flightDate: "15/11/2018"
    };

    const action = receiveFlights(testAPIResponse);

    const expectedAction = {
      type: "RECEIVE_FLIGHTS",
      flightList: testAPIResponse
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("setStartDate", () => {
  it("sets the date in state", () => {
    const date = "15/11/2018";
    const action = setStartDate(date);

    const expectedAction = {
      type: "UPDATE_START",
      date: "15/11/2018"
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("setEndDate", () => {
  it("sets the end date in state", () => {
    const endDate = "23/11/2018";
    const action = setEndDate(endDate);

    const expectedAction = {
      type: "UPDATE_END",
      date: "23/11/2018"
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("suggestionInputToState", () => {
  it("sets the suggestion input to state", () => {
    const suggestion = "London";
    const suggestorName = "Tom";
    const action = suggestionInputToState(suggestorName, suggestion);

    const expectedAction = {
      type: "SET_SUGGESTION_INPUT",
      name: "Tom",
      value: "London"
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("commentInputToState", () => {
  it("sets the comment input to state", () => {
    const comment = "This place is nice";
    const suggestorName = "Tom";
    const action = commentInputToState(suggestorName, comment);

    const expectedAction = {
      type: "SET_COMMENT_INPUT",
      name: "Tom",
      value: "This place is nice"
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("loginToState", () => {
  it("sets the login to state", () => {
    const emailAddress = "tom@gmail.com";
    const fieldName = "loginEmail";
    const action = loginToState(fieldName, emailAddress);

    const expectedAction = {
      type: "SET_LOGIN_INPUT",
      name: "loginEmail",
      value: "tom@gmail.com"
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("registerToState", () => {
  it("sets the reg details to state", () => {
    const name = "Tom";
    const fieldName = "firstName";
    const action = registerToState(fieldName, name);

    const expectedAction = {
      type: "SET_REGISTER_INPUT",
      name: "firstName",
      value: "Tom"
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("suggestionFromDB", () => {
  it("receives an array of suggestions", () => {
    const data = ["suggestion 1", "suggestion 2", "suggestion 3"];
    const action = suggestionsFromDB(data);

    const expectedAction = {
      type: "RECEIVE_SUGGESTIONS",
      suggestions: ["suggestion 1", "suggestion 2", "suggestion 3"]
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("setView", () => {
  it("sets the users view", () => {
    const view = "home";
    const action = setView(view);

    const expectedAction = {
      type: "SET_VIEW",
      view: "home"
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("receiveTrips", () => {
  it("recives an array of trips", () => {
    const trips = ["london", "paris", "germany"];
    const action = receiveTrips(trips);

    const expectedAction = {
      type: "RECEIVE_TRIPS",
      trips: ["london", "paris", "germany"]
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("receiveSuggestions", () => {
  it("receives an array of suggestions", () => {
    const data = ["suggestion 1", "suggestion 2", "suggestion 3"];
    const action = receiveSuggestions(data);

    const expectedAction = {
      type: "RECEIVE_SUGGESTIONS",
      suggestions: ["suggestion 1", "suggestion 2", "suggestion 3"]
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("setTripState", () => {
  it("sets the trip in state", () => {
    const fieldName = "tripName";
    const tripName = "Tom's Trip Away";
    const action = setTripState(fieldName, tripName);

    const expectedAction = {
      type: "SET_TRIP_STATE",
      name: "tripName",
      value: "Tom's Trip Away"
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("storeGoogleFetch", () => {
  it("stores the fetch result from Google API", () => {
    const data = ["Paris", "France", "NY"];
    const action = storeGoogleFetch(data);

    const expectedAction = {
      type: "STORE_GOOGLE",
      destinationInfo: ["Paris", "France", "NY"]
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("setSelectedPlace", () => {
  it("stores the selected place from Google API", () => {
    const place = {
      name: "Beer Bar",
      id: 4,
      address: "15 Long Street"
    };
    const action = setSelectedPlace(place.id);

    const expectedAction = {
      type: "STORE_PLACE",
      selectedPlaceID: 4
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("setAddedTripId", () => {
  it("adds the trip ID to state", () => {
    const tripID = 5;
    const action = setAddedTripId(tripID);

    const expectedAction = {
      type: "SET_ADDED_TRIP_ID",
      tripId: 5
    };

    expect(action).toEqual(expectedAction);
  });
});
