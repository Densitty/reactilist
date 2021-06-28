import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  // set a state variable for page to change page
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
      // console.log(url);
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
      // console.log(url);
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          // wipe out any already displayed data if any word is typed and page is already at 1
          return data.results;
        } else if (query) {
          /* when making a search query, the data is place inside an object (provision by the API) hence the need to refactor */
          return [...oldPhotos, ...data.results];
        }
        // no search is made, get the default data
        return [...oldPhotos, ...data];
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchImages();
    // when page changes, run fetchImages() again

    // eslint-disable-next-line
  }, [page]);

  // set a scroll event when the app loads
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      // console.log(`innerHeight : ${window.innerHeight}`);
      // console.log(`scrollY : ${window.scrollY}`);
      // console.log(`body height : ${document.body.scrollHeight}`);
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        // console.log("it worked" + page);
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });

    // remove event listener when we exit the scroll event, ie stop scrolling
    return () => window.removeEventListener("scroll", event);

    // an empty dependency helps in keeping the fetching of image down to 1 or 2 per request
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // upon sending the request, display the 1st page
    setPage(1);
    fetchImages();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="search"
            className="form-input"
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
