import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";

function App() {
  const { loading, data } = useFetch();
  // console.log(data);
  // data we are getting from useFetch is not data from api but an array of an array of data (paginated data)

  // to get the followers for each page, we start with page 0
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // if loading is true, that means no data has yet been obtained, then return, meaning we use the loading state to get the get data to be displayed
    if (loading) {
      return;
    }

    setFollowers(data[page]);

    // dependency is loading in order to get data we need
  }, [loading, page]);

  const handlePage = (index) => {
    console.log("Your clicked button " + index);
    setPage(index);
  };

  const prevPage = () => {
    // console.log(data); // data is an array of arrays of data from api
    setPage((oldPage) => {
      let previousPage = oldPage - 1;

      if (previousPage < 0) {
        previousPage = data.length - 1;
      }

      return previousPage;
    });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;

      if (nextPage > data.length - 1) {
        nextPage = 0;
      }

      return nextPage;
    });
  };

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading..." : "pagination"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {/* render on buttons when data is available, i.e when loading is false */}
        {!loading && (
          <div className={"btn-container"}>
            <button className="prev-btn" onClick={() => prevPage(page)}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  className={`page-btn ${index === page ? "active-btn" : ""}`}
                  key={index}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="next-btn" onClick={() => nextPage(page)}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
