import React, { useEffect, useRef } from "react";

export default function SearchForm({ searchForm }) {
  const searchValue = useRef("");
  // console.log(searchValue);

  /* calling componentDidMount() in a functional component; immediately the component loads, focus on the input element */
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const searchCocktail = () => {
    searchForm(searchValue.current.value);
    // console.log(searchValue.current.value);
  };

  return (
    <section className="section">
      <h2 className="section-title">search cocktails</h2>
      <form action="" className="form search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="cocktail_name">search your favourtie cocktail</label>
          <input
            type="text"
            name="cocktail"
            id="cocktail_name"
            onChange={searchCocktail}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
}
