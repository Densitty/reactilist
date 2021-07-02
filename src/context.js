import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 0,
  numOfPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    // dispatch works like useState
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      // once the data is obtained from the API, dispatch (change the state of the property that will hold the data through the reducer only)
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, numOfPages: data.nbPages },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeStory = (id) => {
    // as commented on ln 35, the dispatch has to handle the removal of a story
    dispatch({ type: REMOVE_STORY, payload: { id } });
  };

  const handleSearch = (query) => {
    // hand over the search functionality to dispatch
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  const handlePage = (value) => {
    // console.log(value);
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
