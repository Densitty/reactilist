import React from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { query, error, setQuery } = useGlobalContext();
  // console.log(query);

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>search movies</h2>
      <input
        className="form-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* display error message if there is any error below */}
      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
