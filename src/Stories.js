import React from "react";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();
  // console.log(data);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="stories">
      {hits.map((story) => {
        const { author, objectID, title, points, url, num_comments } = story;
        return (
          <article className="story" key={objectID}>
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by <span>{author} |</span> {num_comments} comments
            </p>
            <div>
              <a
                href={url}
                target="_blank"
                className="read-link"
                rel="noopener noreferrer"
              >
                read more
              </a>
              <button
                className="remove-btn"
                onClick={() => removeStory(objectID)}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
