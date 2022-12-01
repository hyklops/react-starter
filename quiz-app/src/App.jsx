import React, { useState, useEffect } from "react";
import Trivia from "./assets/components/Trivia";
import "./index.css";

function App() {
  const [trivias, setTrivias] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const updateCorrectAnswers = () => {
    trivias.map((trivia) => {
      setCorrectAnswers((prev) => [...prev, trivia.correct_answer]);
    });
  };

  async function dataFetch() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const data = await res.json();
    return setTrivias(data.results);
  }

  const shuffle = (trivia, index) => {
    const answers = [...trivia.incorrect_answers, trivia.correct_answer];
    const shuffledAnswers = getRandomAnswers(answers);

    // const shuffleArray = (answer) => [...array].sort(() => Math.random() - 0.5);
    return shuffledAnswers;
  };

  const getRandomAnswers = (answers) => {
    const newAnswers = [];

    while (newAnswers.length !== 4) {
      const getRandomIndex = Math.floor(Math.random() * 4);

      const condition = newAnswers.some(
        (item) => item === answers[getRandomIndex]
      );

      if (!condition) {
        newAnswers.push(answers[getRandomIndex]);
      }
    }

    return newAnswers;
  };

  const getTrivias = () => {
    return trivias.map((trivia, index) => {
      return <Trivia question={trivia.question} answers={shuffle(trivia)} />;
    });
  };

  useEffect(() => {
    dataFetch();
  }, []);

  useEffect(() => {
    if (!!trivias) {
      setIsFetched(true);
    }
  }, [trivias]);

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
