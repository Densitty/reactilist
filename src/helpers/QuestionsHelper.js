export const loadQuestionsFromAPI = async (
  amount = 10,
  category = 9,
  difficulty = "easy",
  type = "multiple"
) => {
  const API_ENDPOINT = "https://opentdb.com/api.php?";

  try {
    const response = await fetch(
      `${API_ENDPOINT}amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );

    const data = await response.json();

    const { results } = data;

    return convertQuestionsFromAPI(results);
  } catch (e) {
    console.log(e);
  }
};

const convertQuestionsFromAPI = (rawQuestions) => {
  const questions = rawQuestions.map((result) => {
    const formattedQuestion = {
      question: result.question,
      answerChoices: [...result.incorrect_answers],
    };

    formattedQuestion.answer = Math.floor(Math.random() * 4);

    /* 
          ['a','b','c'].splice(1, 0, 'd') will give ['a','d','b','c']
          start counting from index 1, remove 0 element and place 'd' at the index provided (1)
        */
    formattedQuestion.answerChoices.splice(
      formattedQuestion.answer,
      0,
      result.correct_answer
    );

    return formattedQuestion;
  });

  return questions;
};
