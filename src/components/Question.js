import React, { useState } from "react";

const Question = ({ question, answerChoices, answer, changeQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classToApply, setClassToApply] = useState("");
  // answering state is used to keep track if the user is answering
  const [answering, setAnswering] = useState(false);

  const checkAnswer = (selectedAnswer) => {
    // if user has already answered the question, don't allow answering the question again
    if (answering) {
      return;
    }
    setAnswering(true);
    setSelectedAnswer(selectedAnswer);

    // if selectedAnswer is the answer on the question
    const bonus = selectedAnswer === answer ? 10 : 0;

    const classToApply = selectedAnswer === answer ? "correct" : "incorrect";
    setClassToApply(classToApply);

    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswering(false);
      changeQuestion(bonus);
    }, 1000);
  };

  // console.log(question);
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
      {answerChoices.map((choice, idx) => {
        return (
          <div
            className={`choice-container ${
              selectedAnswer === idx && classToApply
            }`}
            key={idx}
            onClick={() => checkAnswer(idx)}
          >
            <p className="choice-prefix">{idx + 1}</p>
            <p
              className="choice-text"
              dangerouslySetInnerHTML={{ __html: choice }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Question;
