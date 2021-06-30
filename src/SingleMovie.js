import React from "react";
import { useParams, Link } from "react-router-dom";
import { defaultImage } from "./context";

import useFetch from "./useFetch";

const SingleMovie = () => {
  // to get the id on the movie, useParams() comes to the rescue
  const { id } = useParams();
  const { isLoading, error, data: movie } = useFetch(`&i=${id}`);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  // destructuring must be done after we have got the data, if not, we will get null and that will give error
  const { Plot: plot, Poster: poster, Title: title, Year: year } = movie;

  return (
    <section className="single-movie">
      <img src={poster === "N/A" ? defaultImage : poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
