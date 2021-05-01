import React, { useState } from "react";
import List from "./List";
import data from "./data";

function App() {
  const [people, setPeople] = useState(data);

  const showBirthdays = () => {
    setPeople((people) => {
      return (people = data);
    });
  };

  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        <List people={people} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="btn" onClick={() => setPeople([])}>
            Clear All
          </button>
          <button className="btn" onClick={showBirthdays}>
            Show Birthdays
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
