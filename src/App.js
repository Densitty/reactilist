import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  // console.log(questions[index]);
  const { incorrect_answers, correct_answer, question } = questions[index];

  /* to randomize the location of the correct answer */
  // const answers = [...incorrect_answers, correct_answer];

  // answers array hold 3 items already
  let answers = [...incorrect_answers];
  // generate a random number between 0 and 3
  const tempIndex = Math.floor(Math.random() * 4);

  if (tempIndex === 3) {
    // if tempIndex is 3, but answers on has 3 elems [0,1,2], then we push the last item (correct_answer) to the index position [3]
    answers.push(correct_answer);
  } else {
    // if any other number is generated asides 3 (either 0,1,2)

    // answers = ["a", "b", "c"]; // initial value of answers

    /* if, let's say, 2 is generated as tempIndex, push whatever the value of answers[2] is to the end of answers array, meaning
    answers.push(answers[tempIndex]) === answers.push('c')
    now; answers = ['a', 'b', 'c', 'c'] */
    answers.push(answers[tempIndex]);

    /* now at answers[2], which is equal to 'c', replace the value to correct_answer */
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{index}
        </p>
        <article className="container">
          {/* using dangerouslySetInnerHTML because the question ppty coming from the api is not a string but an innerHTML because of the html character inside (safe to use if data is from the api and not from an input from a user) */}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  className="answer-btn"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(correct_answer === answer)}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
