import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // fetch the tours data
  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const toursData = await response.json();
      setLoading(false);
      setTours(toursData);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const deleteTour = (id) => {
    const newTours = [...tours];
    const tourIDToRemove = newTours.findIndex((tour) => {
      return tour.id === id;
    });
    newTours.splice(tourIDToRemove, 1);
    // update the state of tours
    setTours(newTours);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // if no tour has been received from the API
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  // if all tours are removed
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>you have no tours</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  // default value returned by function
  return (
    <main>
      <Tours tours={tours} removeTour={deleteTour} />
    </main>
  );
}

export default App;
