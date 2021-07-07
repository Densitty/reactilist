import React, { Component } from "react";
import Question from "./Question";
import { loadQuestionsFromAPI } from "../helpers/QuestionsHelper";
import ScoreDisplay from "./ScoreDisplay";
import SaveScoreForm from "./SaveScoreForm";

export default class Game extends Component {
  state = {
    questions: [],
    currentQuestion: null,
    loading: true,
    score: 0,
    questionNumber: 0,
    done: false,
    playerDetails: null,
  };

  async componentDidMount() {
    try {
      const questions = await loadQuestionsFromAPI();
      this.setState(
        {
          questions,
          // currentQuestion: questions[0],
          // loading: false,
        },
        () => {
          // setState is asynchronous; we can't guarantee that the state variable (questions) would have been updated before changeQuestions() is called, hence the need to put changeQuestions in callback
          this.changeQuestion();
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  // setGameDetails = (value) => {
  //   this.setState({
  //     playerDetails: value,
  //   });
  // };

  scoreSaved = () => {
    // navigate back to home page after score is saved
    this.props.history.push("/");
  };

  changeQuestion = (bonus = 0) => {
    // first check if there are no more questions to ask
    if (this.state.questions.length === 0) {
      this.setState((prevState) => ({
        done: true,
        // update the score too to include the last point scored
        score: prevState.score + bonus,
      }));
      return;
    }

    /* passing a default value because changeQuestion is called inside asynchronous componentDidMount, but there is no way to pass down the parameter */

    // get random index of the question
    const randomQuestionIndex = Math.floor(
      Math.random() * this.state.questions.length
    );
    // set the current question to the question at that random index
    const currentQuestion = this.state.questions[randomQuestionIndex];
    // remove the question already loaded from the whole questions (remember not to mutate state directly)
    const remainingQuestions = [...this.state.questions];

    /* immediately an answer is chosen, take away the randomIndexQuestion [1 of the 10 questions in the mutated this.state.questions array displayed] from the remainingQuestions array and use it to update the questions state */
    remainingQuestions.splice(randomQuestionIndex, 1);

    // update the state to reflect the changes
    this.setState((prevState) => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: prevState.score + bonus,
      questionNumber: prevState.questionNumber + 1,
    }));
  };

  render() {
    const { loading, done, currentQuestion } = this.state;
    return (
      <>
        {loading && !done && <div id="loader"></div>}

        {!loading && !done && (
          <>
            <ScoreDisplay {...this.state} />
            <Question
              {...currentQuestion}
              changeQuestion={this.changeQuestion}
            />
          </>
        )}

        {/* when there is no more question to display */}
        {done && <SaveScoreForm {...this.state} scoreSaved={this.scoreSaved} />}
      </>
    );
  }
}
