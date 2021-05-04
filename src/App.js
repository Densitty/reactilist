import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const defaultColor = new Values("#f15025").all(10);
  /* console.log(defaultColor); */
  const [colorList, setColorList] = useState(defaultColor);

  const handleSubmit = (e) => {
    e.preventDefault();
    // check whether value is a color or not
    try {
      let colors = new Values(color).all(10);
      // console.log(colors);
      setColorList(colors);
    } catch (e) {
      setError(true);
      console.log(e.message);
    }
  };

  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            placeholder="#f15025"
            className={`${error ? "error" : null}`}
            onChange={(e) => setColor(e.target.value)}
          />
          <button type="submit" className="btn">
            submit
          </button>
        </form>
      </section>
      <section className="colors">
        {colorList.map((color, index) => {
          // console.log(index);

          return (
            <SingleColor key={index} {...color} index={index} hex={color.hex} />
          );
        })}
      </section>
    </>
  );
}

export default App;
