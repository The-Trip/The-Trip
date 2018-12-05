// export * from "./chris";
// export * from "./phil";
// export * from "./mel";
// export * from "./tomactions";

export function setView(view) {
  return {
    type: "SET_VIEW",
    view: view
  };
}

export function addClickedClass(id) {
  return {
    type: "ADD_CLICKED_CLASS",
    id
  };
}

export function removeClickedClass(id) {
  return {
    type: "REMOVE_CLICKED_CLASS",
    id
  };
}

export * from "./loginRegisterActions";
export * from "./tripCreateActions";
export * from "./suggestionActions";
export * from "./flightsActions";
export * from "./splashActions";
