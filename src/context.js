import React, { useState, useContext } from "react";

import useFetch from "./useFetch";

const API_KEY = `${process.env.REACT_APP_MOVIE_API_KEY}`;
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // set state values in the context
  const [query, setQuery] = useState("batman");
  const { isLoading, error, data: movies } = useFetch(`&s=${query}}`);

  const contextData = {
    query,
    isLoading,
    error,
    movies,
    setQuery,
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
