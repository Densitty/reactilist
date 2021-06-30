import React, { useState, useContext, useEffect } from "react";

const API_KEY = `${process.env.REACT_APP_MOVIE_API_KEY}`;
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${API_KEY}`;
console.log(API_ENDPOINT);

export const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // set state values in the context
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      // we either have the query return a movie or movie not found
      if (data.Response === "True") {
        setMovies(data.Search);
        setError({ show: false, msg: "" });
      } else {
        // if the query does not return any data, i.e no movie found
        setError({ show: true, msg: data.Error });
        // since we do not run setMovies(), movies will default to the default, i.e setMovies('batman')
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`Error is`, e);
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  }, [query]);

  const contextData = {
    query,
    fetchMovies,
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
