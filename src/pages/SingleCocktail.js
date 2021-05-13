import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i";

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchCocktail = async () => {
      try {
        const response = await fetch(`${URL}=${id}`);
        const data = await response.json();
        const { drinks } = data;
        if (drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strCategory: category,
            strAlcoholic: info,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            image,
            category,
            info,
            glass,
            instructions,
            ingredients,
          };

          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (e) {
        console.log(e);
      }
      // since we have fetched the data, whether successful or not
      setLoading(false);
    };

    fetchCocktail();
  }, [id]);

  if (loading) {
    return <h2 className="section-title">loading...</h2>;
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail;

    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 section="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>name: {name}</p>
            <p>category: {category}</p>
            <p>info: {info}</p>
            <p>glass: {glass}</p>
            <p>instructions: {instructions}</p>
            <p>
              Would you like to make a glass at home? You can with the following
              ingredients:
              {ingredients.map((ingredient, index) => {
                return ingredient ? (
                  <span key={index}> {ingredient}</span>
                ) : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
