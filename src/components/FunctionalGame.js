import React, { useState, useEffect, useCallback } from "react";
import Question from "./Question";
import { loadQuestionsFromAPI } from "../helpers/QuestionsHelper";
import ScoreDisplay from "./ScoreDisplay";
import SaveScoreForm from "./SaveScoreForm";

const Game = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadQuestionsFromAPI()
      .then((res) => {
        setQuestions(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const scoreSaved = () => {
    // navigate back to home page after score is saved
    props.history.push("/");
  };

  const changeQuestion = (bonus = 0) => {
    // first check if there are no more questions to ask
    if (questions.length === 0) {
      setDone(true);
      setScore((prevState) => prevState + bonus);
      return;
    }

    /* passing a default value because changeQuestion is called inside asynchronous componentDidMount, but there is no way to pass down the parameter */

    // get random index of the question
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    // set the current question to the question at that random index
    const currentQuestion = questions[randomQuestionIndex];
    // remove the question already loaded from the whole questions (remember not to mutate state directly)
    const remainingQuestions = [...questions];

    /* immediately an answer is chosen, take away the randomIndexQuestion [1 of the 10 questions in the mutated this.state.questions array displayed] from the remainingQuestions array and use it to update the questions state */
    remainingQuestions.splice(randomQuestionIndex, 1);

    // update the state to reflect the changes
    setQuestions(remainingQuestions);
    setCurrentQuestion(currentQuestion);
    setLoading(false);
    setScore((prevState) => prevState + bonus);
    setQuestionNumber((prevState) => prevState + 1);
  }; /* ,
    [
      setQuestions,
      setCurrentQuestion,
      setLoading,
      setQuestionNumber,
      setDone,
      questions,
    ] */

  useEffect(
    () => {
      if (!currentQuestion && questions.length) {
        // console.log(questions.length);
        changeQuestion();
      }
    } /* , [currentQuestion, questions, changeQuestion] */
  );

  return (
    <>
      {loading && !done && <div id="loader"></div>}

      {!loading && !done && (
        <>
          <ScoreDisplay score={score} questionNumber={questionNumber} />
          <Question
            question={currentQuestion.question}
            answerChoices={currentQuestion.answerChoices}
            answer={currentQuestion.answer}
            changeQuestion={changeQuestion}
          />
        </>
      )}

      {/* when there is no more question to display */}
      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
};

export default Game;
