import React, { useState, useEffect } from "react";

import SearchForm from "../components/SearchForm";
import CocktailList from "../components/CocktailList";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    // when fetching the data from the API
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}=${searchTerm}`);
        const data = await response.json();

        if (data.drinks) {
          const { drinks } = data;
          const newCocktails = drinks.map((drink) => {
            // console.log(drink);
            const {
              idDrink,
              strDrink,
              strAlcoholic,
              strCategory,
              strGlass,
              strDrinkThumb,
            } = drink;

            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass,
              category: strCategory,
            };
          });

          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
      // since we have fetched the data, whether successful or not
      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <main>
      <SearchForm searchForm={setSearchTerm} />
      <CocktailList loading={loading} cocktailItems={cocktails} />
    </main>
  );
}
