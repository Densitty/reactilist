import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case SET_STORIES:
      return {
        ...state,
        isLoading: false, // since we are getting data back
        hits: action.payload.hits,
        numOfPages: action.payload.numOfPages,
      };

    case REMOVE_STORY:
      const newHits = [...state.hits].filter((hit) => {
        return hit.objectID !== action.payload.id;
      });
      return {
        ...state,
        // hits: newHits,
        hits: newHits,
      };

    case HANDLE_PAGE:
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
      break;

    case HANDLE_SEARCH: {
      return {
        ...state,
        query: action.payload,
        page: 0,
      };
    }

    default:
      throw new Error("No matching action, " + action.type + ", type");
  }
};
export default reducer;
