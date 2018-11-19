export function setNavActive() {
  return {
    type: "SET_NAV_ACTIVE"
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
