import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // waiting state is for the form to be filled to be displayed
  const [waiting, setWaiting] = useState(true);
  // loading state is for waiting to get data fetched from the api
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);

  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    // when request is made to the api, it means the form has been filled
    setWaiting(false);
    // wait for the data to come from the api
    setLoading(true);

    const response = await axios(url).catch((err) => console.log(err));
    // console.log(response);
    if (response) {
      const data = response.data.results;
      // if we are getting questions, then data has a length > 0
      if (data.length > 0) {
        setQuestions(data);
        // when questions state has been updated, the below state values should change
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        // open the modal to show our score
        openModal();
        return 0;
      }

      return index;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((currentValue) => {
        return currentValue + 1;
      });
    }
    // irrespective of whether the answer chosen is right or not, move to the next question
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // when the modal is closed, the questions form should be displayed
    setWaiting(true);
    // reset the correct state
    setCorrect(0);
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;

    /* dynamic properties in action 
    const color = "blue";
    const favorites = {city: "Hong Kong", [color]: "green",};
    console.log(favorites);
    // instead of doing 
    favorites['color'] = 'green'
  */
    setQuiz({
      ...quiz, // keep the previous state of quiz
      [name]: value, // dynamic properties
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz;

    // const tempUrl = `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`;

    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    // make a call to the api
    fetchQuestions(url);
  };
  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  // }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
        quiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
