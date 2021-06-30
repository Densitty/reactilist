import React, { useContext } from "react";
import { AppContext, useGlobalContext } from "./context";
import { Link } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
  // eslint-disable-next-line no-unused-vars
  const movieData = useContext(AppContext);
  // instead of calling useContext as above, we create useGlobalContext and export it from our context.js file (line 9 === line 10)
  const dataFromContext = useGlobalContext();
  // console.log(dataFromContext);
  const { movies, isLoading } = dataFromContext;

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="movies">
      {movies.map((movie) => {
        const { imdbID: id, Poster: poster, Title: title, Year: year } = movie;
        // console.log(movie);
        return (
          <Link to={`/movies/${id}`} key={id} className="movie">
            <article>
              {/* if movies does not have image, use default image in url */}
              <img src={poster === "N/A" ? url : poster} alt={title} />
              <div className="movie-info">
                <h4 className="title">{title}</h4>
                <p>{year}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Movies;
