/* eslint-disable react/prop-types */
import React from "react";
import { nanoid } from "nanoid";

const Trivia = (props) => {
  const { question, answers, selectAnswer, questionIndex } = props;
  const renderAnswers = () => {
    return answers.map?.((item, answerIndex) => {
      const styles = {
        backgroundColor: item.isSelected ? "#59E391" : null,
      };

      return (
        <button
          value={item.value}
          style={styles}
          onClick={() => selectAnswer(questionIndex, answerIndex)}
          key={nanoid()}
          className={`answer--${answerIndex + 1} answer ${"placeholder"}`}
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
