/* eslint-disable react/prop-types */
import React from "react";
import { nanoid } from "nanoid";

const Trivia = (props) => {
  const {
    question,
    answers,
    selectAnswer,
    questionIndex,
    check,
    correctAnswers,
  } = props;
  const renderAnswers = () => {
    return answers.map?.((item, answerIndex) => {
      const isCorrect = correctAnswers.includes(item.value);

      return (
        <button
          value={item.value}
          style={
            !check
              ? item.isSelected
                ? { backgroundColor: "#D6DBF5" }
                : null
              : item.isSelected
              ? isCorrect
                ? { backgroundColor: "#59E391" }
                : { backgroundColor: "#F8BCBC" }
              : isCorrect
              ? { backgroundColor: "#59E391" }
              : { backgroundColor: null, color: "grey", borderColor: "grey" }
          }
          onClick={() => selectAnswer(questionIndex, answerIndex)}
          key={nanoid()}
          className={`answer--${answerIndex + 1} answer`}
        >
          <div
            className="answerButtons"
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        </button>
      );
    });
  };

  return (
    <div className="trivias">
      <div className="question">
        <div dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      <div className="answers">{renderAnswers()}</div>
    </div>
  );
};

export default Trivia;
