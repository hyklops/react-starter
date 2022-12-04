import React, { useState, useEffect } from "react";
import Trivia from "./assets/components/Trivia";
import "./index.css";
import { nanoid } from "nanoid";

function App() {
  const [trivias, setTrivias] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [answersArr, setAnswersArr] = useState([]);

  console.log({ answersArr });

  async function dataFetch() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const data = await res.json();
    return setTrivias(data.results);
  }

  /* function is duplicating because of logic. Need to Fix.

  const getRandomAnswers = (answers) => {
    const newAnswers = [];

    while (newAnswers.length !== 4) {
      const getRandomIndex = Math.floor(Math.random() * 4);

      const condition = newAnswers.some((item) => {
        item === answers[getRandomIndex].value ||
          item.value === answers[getRandomIndex].value;
      });
      console.log({ condition });
      !condition &&
        newAnswers.push({ value: answers[getRandomIndex], isSelected: false });
    }

    console.log(newAnswers);
    return newAnswers;
  };
  */

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

  const selectAnswer = (event) => {
    setAnswersArr((prev) => {
      return prev.map((prevPrev, prevIndex) => {
        return prevPrev.map((answer, index) => {
          if (answer.isSelected) return { ...answer, isSelected: false };
          return answer.value === event.value
            ? { ...answer, isSelected: !answer.isSelected }
            : answer;
        });
      });
    });
  };

  const getTrivias = () => {
    return trivias.map((trivia, index) => {
      return (
        <Trivia
          question={trivia.question}
          answers={answersArr[index]}
          key={nanoid()}
          answersArr={answersArr}
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
      console.log({ correctAnswers });
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
