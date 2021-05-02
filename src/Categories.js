import React from "react";

// hard coding the categories buttons
/* const Categories = ({ filterCategories }) => {
  return (
    <div className="btn-container">
      <button className="filter-btn" onClick={() => filterCategories("all")}>
        all
      </button>
      <button
        className="filter-btn"
        onClick={() => filterCategories("breakfast")}
      >
        breakfast
      </button>
  );
}; */

// adding the buttons dynamically from the category of the items
const Categories = ({ filterCategories, menuCategories }) => {
  return (
    <div className="btn-container">
      {menuCategories.map((category, index) => {
        return (
          <button
            className="filter-btn"
            key={index}
            onClick={() => filterCategories(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
