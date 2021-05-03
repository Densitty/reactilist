import React, { useState } from "react";
import data from "./data";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(typeof count);
    /* count in state is initially set to 0 (an int) but the count got from setState is a string because of the <input> element, hence the need to convert it as below */
    let amount = parseInt(count);

    // if count is less than zero or zero
    if (count <= 0) {
      amount = 1;
    }

    // if count set is more than items in the data array
    if (count > data.length) {
      amount = data.length;
    }

    setText(data.slice(0, amount));
  };

  return (
    <section className="section-center">
      <h3>tired of boring text?</h3>
      <form className="lorem-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="amount">paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit" className="btn">
          generate
        </button>
      </form>
      <article className="lorem-text">
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
