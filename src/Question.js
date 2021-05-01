import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = (props) => {
  const { title, info } = props;
  // console.log(props);

  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {/* {showInfo ? <p>{info}</p> : null} */}
      {/* above or below */}
      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default Question;
