import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SET_STORIES) {
    return {
      ...state,
      isLoading: false, // since we are getting data back
      hits: action.payload.hits,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === REMOVE_STORY) {
    const targetHitIndex = [...state.hits].findIndex((hit) => {
      return hit.id === action.payload.id;
    });

    const newHits = [...state.hits].filter((hit) => {
      return hit.objectID !== action.payload.id;
    });

    const myNewHits = [...state.hits].splice(targetHitIndex, 1);

    // console.log(newHits);
    return {
      ...state,
      // hits: newHits,
      hits: myNewHits,
    };
  }

  if (action.type === HANDLE_PAGE) {
    if (action.payload === "inc") {
      let nextPage = state.page + 1;
      // numOfPages is an array; if numOfPages is 50, then last page will be 49 'cos array starts at zero and page[49] is the last page
      if (nextPage > state.numOfPages - 1) {
        nextPage = 0;
      }

      return {
        ...state,
        page: nextPage,
      };
    }

    if (action.payload === "dec") {
      let prevPage = state.page - 1;
      // numOfPages is an array; if numOfPages is 50, then last page will be 49 'cos array starts at zero and page[49] is the last page
      if (prevPage < 0) {
        prevPage = state.numOfPages - 1;
      }

      return {
        ...state,
        page: prevPage,
      };
    }
  }

  if (action.type === HANDLE_SEARCH) {
    return {
      ...state,
      query: action.payload,
      page: 0,
    };
  }

  throw new Error("No matching action, " + action.type + ", type");
};
export default reducer;
