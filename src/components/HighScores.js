import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseContext } from "./Firebase/FirebaseContext";

const HighScores = () => {
  const [scoreRecords, setScoreRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const firebase = useFirebaseContext();

  useEffect(() => {
    firebase
      .scores()
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        const sortedScores = formatScoreData(data);
        setScoreRecords(sortedScores);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatScoreData = (firebaseScores) => {
    let scores = [];

    for (const key in firebaseScores) {
      const scoreData = firebaseScores[key];
      scoreData["id"] = key;
      scores.push(scoreData);
    }
    return scores.sort((a, b) => b.score - a.score).slice(0, 10);
  };

  return (
    <>
      {loading ? (
        <div id="loader"></div>
      ) : (
        <>
          <h1>High Scores</h1>
          <div id="highScoresList">
            {scoreRecords.map((record) => {
              // console.log(score);
              return (
                <li key={record.id} className="high-score">
                  {record.username} - {record.score}
                </li>
              );
            })}
          </div>
          <Link to="/" className="btn">
            Home
          </Link>
        </>
      )}
    </>
  );
};

export default HighScores;
