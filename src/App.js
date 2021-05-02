import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

/*
const catList = ["all"];
items.map((item) => {
  if (catList.indexOf(item.category) === -1) {
    catList.push(item.category);
  }
  return catList;
});
console.log(catList);
*/

const allCategories = ["all", ...new Set(items.map((item) => item.category))];
// console.log(allCategories);

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      // return from the function
      return;
    }

    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu-section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        {/* hard-coding the categories; done below */}
        {/* <Categories filterCategories={filterItems} /> */}
        {/* dynamically filling up the categories; done below */}
        <Categories
          menuCategories={categories}
          filterCategories={filterItems}
        />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
