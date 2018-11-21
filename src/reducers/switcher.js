function switcher(
  state = {
    clickedLike: false,
    clickedFav: false,
    clickedTime: false,
    clickedLikes: false,
    clickedFavFilter: false
  },
  action
) {
  switch (action.type) {
    case "ADD_CLICKED_LIKE":
      return Object.assign({}, state, { clickedLike: true });

    case "REMOVE_CLICKED_LIKE":
      return Object.assign({}, state, { clickedLike: false });

    case "ADD_CLICKED_FAV":
      return Object.assign({}, state, { clickedFav: true });

    case "REMOVE_CLICKED_FAV":
      return Object.assign({}, state, { clickedFav: false });

    case "ADD_CLICKED_TIME":
      return Object.assign({}, state, { clickedTime: true });

    case "REMOVE_CLICKED_TIME":
      return Object.assign({}, state, { clickedTime: false });

    case "ADD_CLICKED_LIKES":
      return Object.assign({}, state, { clickedLikes: true });

    case "REMOVE_CLICKED_LIKES":
      return Object.assign({}, state, { clickedLikes: false });

    case "ADD_CLICKED_FAVFILTER":
      return Object.assign({}, state, { clickedFavFilter: true });

    case "REMOVE_CLICKED_FAVFILTER":
      return Object.assign({}, state, { clickedFavFilter: false });

    default:
      return state;
  }
}

export default switcher;
