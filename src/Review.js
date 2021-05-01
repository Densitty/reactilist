import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);
  const { id, name, job, image, text } = people[index];

  const checkNumber = (number) => {
    // if we have reached the end of the people array
    if (number > people.length - 1) {
      return 0;
    }

    // if we have reached the beginning of the people array
    if (number < 0) {
      return people.length - 1;
    }

    // default return
    return number;
  };

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      // if (newIndex > people.length - 1) {
      //   newIndex = 0;
      // }
      // return newIndex;

      // use function to avoid duplication
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      /* if (newIndex < 0) {
        newIndex = people.length - 1;
      }
      return newIndex; */

      // use function to avoid duplication
      return checkNumber(newIndex);
    });
  };

  const randomPerson = () => {
    let value = Math.floor(Math.random() * people.length);

    // to avoid repetition of index, if same value appears successively after another, increase index by 1
    if (value === index) {
      value = index + 1;
    }
    /* setIndex((index) => {
      if (value < 0) {
        return (value = people.length - 1);
      }
      
      if (value > people.length - 1) {
        return (value = 0);
      }
      return (index = value);

    }); */

    setIndex(checkNumber(value));
  };

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>

        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <button className="random-btn" onClick={randomPerson}>
        surprise me
      </button>
    </article>
  );
};

export default Review;
