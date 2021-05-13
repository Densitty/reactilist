import React from "react";

//since we are going link to a single cocktail
import { Link } from "react-router-dom";

export default function Cocktail(props) {
  const { name, glass, id, image, info } = props;

  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>

      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
}
