import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import Trivia from "./assets/components/Trivia";
import "./index.css";

function App() {
  const [trivias, setTrivias] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [answersArr, setAnswersArr] = useState([]);

  async function dataFetch() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const data = await res.json();
    return setTrivias(data.results);
  }

  const shuffle = (trivia) => {
    const newAnswers = [];
    const answers = [...trivia.incorrect_answers, trivia.correct_answer];
    const shuffleArray = (answers) =>
      [...answers].sort(() => Math.random() - 0.5);
    const shuffledAnswers = shuffleArray(answers);
    shuffledAnswers.map((answer) =>
      newAnswers.push({ value: answer, isSelected: false })
    );

    return newAnswers;
  };

  const selectAnswer = (questionIndex, answerIndex) => {
    setAnswersArr((prevState) => {
      const returnValue = prevState[questionIndex].map((item, idx) => {
        if (idx === answerIndex) {
          return { ...item, isSelected: true };
        }
        return { ...item, isSelected: false };
      });

      const returnArr = [
        ...prevState.slice(0, questionIndex),
        returnValue,
        ...prevState.slice(questionIndex + 1),
      ];

      return returnArr;
    });
  };

  const getTrivias = () => {
    return trivias.map((trivia, index) => {
      console.log("hellooo");
      return (
        <Trivia
          key={nanoid()}
          question={trivia.question}
          answers={answersArr[index]}
          questionIndex={index}
          selectAnswer={selectAnswer}
        />
      );
    });
  };

  useEffect(() => {
    dataFetch();
  }, []);

  useEffect(() => {
    if (trivias) {
      trivias.map((trivia) => {
        const newAnswers = shuffle(trivia);
        setAnswersArr((prev) => [...prev, newAnswers]);
      });
    }
  }, [trivias]);

  useEffect(() => {
    if (trivias) {
      setIsFetched(true);
      const updateCorrectAnswers = () => {
        return trivias.map((trivia) => {
          if (correctAnswers.some((item) => item === trivia.correct_answer));
          else setCorrectAnswers((prev) => [...prev, trivia.correct_answer]);
        });
      };
      updateCorrectAnswers();
    }
  }, [trivias, correctAnswers]);

  if (!isFetched) {
    return <h1>loading</h1>;
  }

  return (
    <div className="App">
      <div>{getTrivias()}</div>
      <div className="check">
        <button>Check Answers</button>
      </div>
    </div>
  );
}

export default App;
