import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseContext } from "./Firebase/FirebaseContext";

const SaveScoreForm = ({ score, scoreSaved }) => {
  const [username, setUsername] = useState("");

  const firebase = useFirebaseContext();

  const saveHighScore = (e) => {
    e.preventDefault();

    const record = {
      score,
      username,
    };

    firebase
      .scores()
      .push(record)
      .then(() => {
        scoreSaved();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      <h1>Score: {score}</h1>
      <form onSubmit={saveHighScore}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="game player"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <button className="btn" disabled={!username}>
          Save Score
        </button>
      </form>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </div>
  );
};

export default SaveScoreForm;
