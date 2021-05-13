import React from "react";
import Cocktail from "./Cocktail";

export default function CocktailList({ cocktailItems, loading }) {
  // console.log(cocktails);

  if (loading) {
    return <h2 className="section-title">loading...</h2>;
  }

  if (cocktailItems.length < 1) {
    return (
      <h2 className="section-title">No cocktail matched your search term</h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktailItems.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail} />;
        })}
      </div>
    </section>
  );
}
