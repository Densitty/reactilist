import { useState, useEffect } from "react";

const API_KEY = `${process.env.REACT_APP_MOVIE_API_KEY}`;
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [data, setData] = useState(null);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      // we either have the query return a movie or movie not found
      if (data.Response === "True") {
        // data.Search is for movies [an array]
        // data is for a single movie [an object]
        setData(data.Search || data);
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
    fetchData(`${API_ENDPOINT}&s=${urlParams}`);
  }, [urlParams]);

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetch;
