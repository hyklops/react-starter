import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Stats from "./Stats";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [isTimerActive, setIsTimerActive] = React.useState(false);
  const [bestTime, setBestTime] = React.useState(
    localStorage.getItem("bestTime") || 0
  );

  React.useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isTimerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const runner = () => {
    if (!isTimerActive) {
      setIsTimerActive(true);
    }
  };

  function saveBestTime(currentTime) {
    if (bestTime === 0) {
      localStorage.setItem("bestTime", currentTime);
      setBestTime(localStorage.getItem("bestTime"));
      return;
    }
    if (currentTime < bestTime) {
      localStorage.setItem("bestTime", currentTime);
      setBestTime(localStorage.getItem("bestTime"));
      return;
    }
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setIsTimerActive(false);
      saveBestTime(timer);
    }
  }, [dice]);

  const counter = () => {
    setRollCount((prevCount) => {
      return tenzies === true ? (prevCount = 0) : prevCount + 1;
    });
  };

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setTimer(0);
    }
  }

  const reset = () => {
    setDice(allNewDice());
    setRollCount(0);
    setTimer(0);
    setIsTimerActive(false);
    setTenzies(false);
  };

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      runner={runner}
      bestTime={bestTime}
    />
  ));

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <div className="dice-container">{diceElements}</div>
        <div className="roll-stats">
          <button className="roll-dice reset" onClick={reset}>
            Reset
          </button>
          <button
            className="roll-dice"
            onClick={() => {
              counter();
              rollDice();
              runner();
            }}
          >
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
        <Stats rollCount={rollCount} timer={timer} bestTime={bestTime} />
      </main>
    </div>
  );
}
