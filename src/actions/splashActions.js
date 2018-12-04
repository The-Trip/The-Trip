export function fetchCustomersDestinationsFromDB() {
  return function(dispatch) {
    fetch(`/api/custlocations`)
      .then(response => response.json())
      .then(destinations => {
        dispatch(setCustomerDestinations(destinations));
      })
      .catch(console.error);
  };
}

export function setCustomerDestinations(destinations) {
  return {
    type: "SET_SPLASH_IMAGE",
    destinations
  };
}